const express = require('express');
// creater router
const router = express.Router();
// require our controller
const favoritesController = require('../controllers/favoritesController');

// favorites router for get requests
router.get('/:user_email', favoritesController.getFavorites, (req, res) => {
  res.send(res.locals.favorites);
});

// favorites router for post requests
router.post('/:user_email', favoritesController.addFavorites, (req, res) => {
  res.status(200).send('favorite added successfully');
});

// favorites router for delete requests
router.delete(
  '/:user_email',
  favoritesController.deleteFavorites,
  (req, res) => {
    res.status(200).send('favorite deleted successfully');
  }
);
module.exports = router;
