const Review = require('../models/Review');
const User = require('../models/User');

/**
 * @description Get Review
 * @method get
 * @access private
 */
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ userId: req.userId })

    res.status(200).json({
      message: 'Fetched reviews successfully',
      reviews,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Add Review
 * @method post
 * @access private
 */
exports.addReview = async (req, res, next) => {
  const { title, rating, content, itemId } = req.body;
  try {
    const review = new Review({
      title,
      rating,
      content,
      itemId,
      userId: req.userId,
    });
    const reviewResult = await review.save();
    const user = await User.findById(req.userId);
    user.reviews.push(reviewResult);
    await user.save();
    res.status(201).json({
      message: 'Review created successfully',
      review: reviewResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Delete Review
 * @method update
 * @access private
 */
exports.updateReview = async (req, res, next) => {
  const { reviewId } = req.params;
  const { title, rating, content, itemId } = req.body;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      const error = new Error('Could not find the post');
      error.statusCode = 404;
      throw error;
    }
    if (review.userId.toString() !== req.userId) {
      const error = new Error('Not authenticated');
      error.statusCode = 403;
      throw error;
    }
    review.title = title;
    review.content = content;
    review.rating = rating;
    review.itemId = itemId;
    const updatedReview = await review.save();
    res.status(200).json({
      message: 'Post updated succesfully',
      post: updatedReview,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

}

/**
 * @description Delete Review
 * @method delete
 * @access private
 */
exports.deleteReview = async (req, res, next) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(reviewId);
    if (!review) {
      const error = new Error('Could not find the review');
      error.statusCode = 404;
      throw error;
    }
    if (review.userId.toString() !== req.userId) {
      const error = new Error('Not authenticated');
      error.statusCode = 403;
      throw error;
    }
    await Review.findByIdAndRemove(reviewId);
    const user = await User.findById(req.userId);
    user.reviews.pull(reviewId);
    await user.save();

    res.status(200).json({
      message: 'Post deleted successfully',
      review,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}