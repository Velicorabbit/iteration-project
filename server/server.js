const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();
const PORT = 5000;

// routers
const businessesRouter = require('./routes/businesses.js');
const locationRouter = require('./routes/location.js');
const newsRouter = require('./routes/news.js');
const weatherRouter = require('./routes/weather.js');
const favoritesRouter = require('./routes/favorites.js');
// require loginRouter for use when hitting initial endpoint
const loginRouter = require('./routes/login.js');

app.use(
  cookieSession({
    // milliseconds of a day
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// required to initialize passport middleware
app.use(passport.initialize());
// must be used if your application requires persistent sessions - if we intend to use sessions we must declare app.use(express.session({secret: some secret})) before
app.use(passport.session());

// route handlers
app.use('/businesses', businessesRouter);
app.use('/location', locationRouter);
app.use('/news', newsRouter);
app.use('/weather', weatherRouter);
app.use('/favorites', favoritesRouter);

// possibly need to create route handler for when user clicks login button
app.use('/login', loginRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '..build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../template.html'));
  });
}

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'email'],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    // isloggediN = true
    // /isuserloggedin
    // if you want to change where the user is taken after the oauth is complete, right here do
    // res.redirect(whatever path you want)
    // res.redirect('http://localhost:8080/');
    // console.log('req.user: ', req.user);
    // res.send(req.user);
    // res.render('/', { status: req.user })
    res.redirect('/');
    // res.status(200).json(req.user);
  }
);

app.get('/auth/logout', (req, res) => {
  req.logout();
  res.send(req.user);
});

// app.get('/test', favoritesController.verifyUser  (req, res) => {
//   res.json(res.locals.user);
// })

// catch-all route handler
app.use('*', (req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: `Express error handler caught unknown middleware error: ${err}`,
    status: 400,
    message: { err: `An error occured. ERROR: ${JSON.stringify(err)}` },
  };

  const errObj = Object.assign({}, defaultErr, err);

  console.log(errObj.log);

  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
