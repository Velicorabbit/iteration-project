// require express package
const express = require('express');
// creater router
const router = express.Router();
// require our controller
const locationsController = require('../controllers/locationController');

// location route to get location data
router.get(
  '/:location',
  locationsController.getLocationData,
  locationsController.getCountryCode,
  (req, res) => {
    const { latitude, longitude, countryCode } = res.locals;
    res.status(200).json({ latitude, longitude, countryCode });
  }
);

module.exports = router;
