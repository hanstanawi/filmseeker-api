const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/series.controllers');

router.get('/on-air', seriesController.onAirSeries);

router.get('/popular', seriesController.popularSeries);

router.get('/top-rated', seriesController.topRatedSeries);

router.get('/:id', seriesController.getSeriesDetails);

module.exports = router;