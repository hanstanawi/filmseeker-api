const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const watchlistController = require('../controllers/watchlist.controllers');

router.get('/', isAuth, watchlistController.getWatchlist);

router.post('/', isAuth, watchlistController.addItemToWatchlist);

router.delete('/:itemId', isAuth, watchlistController.deleteItemFromWatchlist);

module.exports = router;