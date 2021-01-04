const express = require('express');
const router = express.Router();
const isAuth = require('../middlewares/isAuth');
const reviewController = require('../controllers/reviews.controllers');

router.get('/', isAuth, reviewController.getReviews);

router.post('/', isAuth, reviewController.addReview);

router.put('/:reviewId', isAuth, reviewController.updateReview);

router.delete('/:reviewId', isAuth, reviewController.deleteReview);

module.exports = router;