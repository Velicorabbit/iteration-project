const fetch = require('node-fetch');
require('dotenv').config();

const locationController = {};

const API_KEY = process.env.GEOCODE_API_KEY;

// get information from google maps api
locationController.getLocationData = (req, res, next) => {
  const { location } = req.params;
  // TODO: handle possible parsing of params in case of spaces in location 'los angeles'
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`;
  fetch(url)
    .then((data) => data.json())
    .then((locationData) => {
      console.log("location data ", locationData.results[0]);
      const { address_components, geometry } = locationData.results[0];
      const { lat, lng } = geometry.location;
      res.locals.latitude = lat;
      res.locals.longitude = lng;
      res.locals.addressComponenets = address_components;

      return next();
    })
    .catch((error) => next({ log: `Error in locationController.getLocationData; ERROR: ${error}` }));
};

// get countrycode from google geocode api address_components section in results
locationController.getCountryCode = (req, res, next) => {
  try {
    // iterate through res.locals.addressComponenets
    for (let i = 0; i < res.locals.addressComponenets.length; i += 1) {
      const obj = res.locals.addressComponenets[i];
      /* if the object types key contains value of "country",
      store lowercase version of "short_name" key's value */
      if (obj.types.includes('country')) {
        res.locals.countryCode = obj.short_name.toLowerCase();
        return next();
      }
    }
    res.locals.countryCode = null;
    return next();
  } catch (error) {
    return next({ log: `Error in locationController.getLocationData; ERROR: ${error}` });
  }
};

module.exports = locationController;
