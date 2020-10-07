const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// routers
const businessesRouter = require('./routes/businesses.js');
const locationRouter = require('./routes/location.js');
const newsRouter = require('./routes/news.js');
const weatherRouter = require('./routes/weather.js');
const favoritesRouter = require('./routes/favorites.js');

// application-level middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route handlers
app.use('/businesses', businessesRouter);
app.use('/location', locationRouter);
app.use('/news', newsRouter);
app.use('/weather', weatherRouter);
app.use('/favorites', favoritesRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.resolve(__dirname, '..build')));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../template.html'));
  });
}

// catch-all route handler
app.use('*', (req, res) => res.sendStatus(404));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
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
