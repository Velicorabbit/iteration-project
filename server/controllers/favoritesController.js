const db = require('../models.js');
const fetch = require('node-fetch');
require('dotenv').config();

const favoritesController = {};

favoritesController.getFavorites = (req, res, next) => {
  const email = req.params.user_email;
  const baseRequest = `SELECT *
  FROM activities
  LEFT JOIN favorites ON favorites.activities_id = activities.activities_id
  LEFT JOIN users ON users.user_id = favorites.user_id
  WHERE users.email = $1`;
  db.query(baseRequest, [email])
    .then((data) => {
      console.log(data.rows);
      res.locals.favorites = data.rows;
      next();
    })
    .catch((error) => {
      next({
        log: `favoritesController.getUser: ERROR: Error getting event data from data base: error code ${error.status}`,
        message: {
          err:
            'Error occurred in favoritesController.getUser. Check server logs for more details.',
        },
      });
    });
};

favoritesController.addFavorites = async (req, res, next) => {
  const email = req.params.user_email;
  const {
    yelp_id,
    name,
    address1,
    city,
    zip_code,
    country,
    review_count,
    price,
    category,
    alias,
    image_url,
    yelp_url,
  } = req.body;

  const checkYelpId = `SELECT * FROM activities WHERE yelp_id = $1`;

  const firstRequest = `INSERT INTO activities (yelp_id, name, address1, city, zip_code, country, review_count, price, category, alias, image_url, yelp_url) 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;

  const isolateUserId = `SELECT users.user_id
  FROM users
  WHERE users.email = $1`;

  const isolateActivityId = `SELECT activities.activities_id
  FROM activities
  WHERE activities.yelp_id = $1`;

  const secondRequest = `INSERT INTO favorites (user_id, activities_id) VALUES ($1, $2)`;

  const checkFavorites = `SELECT * FROM favorites 
  WHERE user_id = $1 AND activities_id = $2`;

  try {
    // create activity
    const yelpId = await db.query(checkYelpId, [yelp_id]);

    if (!yelpId.rows[0]) {
      await db.query(firstRequest, [
        yelp_id,
        name,
        address1,
        city,
        zip_code,
        country,
        review_count,
        price,
        category,
        alias,
        image_url,
        yelp_url,
      ]);
    }
    // get the userid from the email address
    const userId = await db.query(isolateUserId, [email]);
    // get the activity id from the yelp id from the req
    const activityId = await db.query(isolateActivityId, [yelp_id]);
    // insert into favorites using the above user id and activity id
    const favoriteExists = await db.query(checkFavorites, [
      userId.rows[0].user_id,
      activityId.rows[0].activities_id,
    ]);
    // if the user does not already have a favorite in the db for the activity, then create the row in the favorites table
    if (!favoriteExists.rows[0]) {
      await db.query(secondRequest, [
        userId.rows[0].user_id,
        activityId.rows[0].activities_id,
      ]);
    }
    return next();
  } catch (e) {
    return next(e);
  }
};

favoritesController.deleteFavorites = async (req, res, next) => {
  const { user_email } = req.params;
  const { yelp_id } = req.body;

  const isolateUserId = `SELECT users.user_id
  FROM users
  WHERE users.email = $1`;

  const isolateActivityId = `SELECT activities.activities_id FROM activities WHERE yelp_id = $1`;

  const baseRequest = `
  DELETE FROM favorites 
  WHERE user_id = $1 AND activities_id = $2`;

  try {
    // get the userid from db using the email
    const userId = await db.query(isolateUserId, [user_email]);
    // get activity id from db using yelp_id
    const activityId = await db.query(isolateActivityId, [yelp_id]);
    // delete favorite row using the two ids above.
    await db.query(baseRequest, [
      userId.rows[0].user_id,
      activityId.rows[0].activities_id,
    ]);
    return next();
  } catch (e) {
    return next(e);
  }
};



module.exports = favoritesController;
