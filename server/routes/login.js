const express = require('express');
const db = require('../models.js');

const router = express.Router();
const app = express();

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

require('dotenv').config(); // Loads variables from .env into process.env

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const first_name = profile.name.givenName;
      const last_name = profile.name.familyName;
      const baseRequest = `INSERT into USERS (first_name, last_name, email, auth_token ) 
      VALUES ($1, $2, $3, $4)`;
      const checkUsers = `SELECT * FROM users WHERE email = $1`;
      //check if user in db
      const userFound = await db.query(checkUsers, [email]);
      //if user not in db then create user
      if (!userFound.rows[0]) {
        await db.query(baseRequest, [
          first_name,
          last_name,
          email,
          accessToken,
        ]);
      }
      return done(null, email);
    }
  )
);
// look more into these methods if you want to understand
passport.serializeUser(function (email, done) {
  done(null, email);
});

passport.deserializeUser( async (email, done) => {
  const query = `SELECT * FROM USERS WHERE EMAIL = $1`
  const user = await db.query(query, [email]);
  done(null, user);

});

// app.get(
//   '/auth/google',
//   passport.authenticate('google', {
//     scope: ['https://www.googleapis.com/auth/plus.login'],
//   })
// );

// app.get(
//   '/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('http://localhost:8080');
//   }
// );

module.exports = router;
