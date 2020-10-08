const db = require('../models.js');
const fetch = require('node-fetch');
require('dotenv').config();

const userController = {};

userController.createUser = async (req, res, next) => {
  console.log('usercontrollrer has triggered');
  const { firstName, lastName, email } = req.body;
  const baseRequest = `INSERT into USERS (first_name, last_name, email ) 
    VALUES ($1, $2, $3)`;
  const checkUsers = `SELECT * FROM users WHERE email = $1`;
  //check if user in db
  const userFound = await db.query(checkUsers, [email]);
  //if user not in db then create user
  if (!userFound.rows[0]) {
    await db.query(baseRequest, [firstName, lastName, email]);
  }
  res.locals.userEmail = email;
  return next();
};

userController.sendFavorites = (req, res, next) => {
  console.log('hitting sendFavorites');
  const email = res.locals.userEmail;
  const baseRequest = `SELECT *
  FROM activities
  LEFT JOIN favorites ON favorites.activities_id = activities.activities_id
  LEFT JOIN users ON users.user_id = favorites.user_id
  WHERE users.email = $1`;
  db.query(baseRequest, [email])
    .then((data) => {
      console.log(data.rows);
      res.locals.favorites = data.rows;
      return next();
    })
    .catch((error) => {
      return next({
        log: `favoritesController.getUser: ERROR: Error getting event data from data base: error code ${error.status}`,
        message: {
          err:
            'Error occurred in favoritesController.getUser. Check server logs for more details.',
        },
      });
    });
};

module.exports = userController;
