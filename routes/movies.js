const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies.controllers')

router.get('/now-playing', moviesController.nowPlayingMovies);

router.get('/popular', moviesController.popularMovies);

router.get('/top-rated', moviesController.topRatedMovies);

router.get('/upcoming', moviesController.upcomingMovies);

router.get('/search', moviesController.movieSearch);

router.get('/:id', moviesController.getMovieDetails);

module.exports = router;

