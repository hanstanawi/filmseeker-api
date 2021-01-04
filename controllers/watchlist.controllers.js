const User = require('../models/User');

/**
 * @description Get Watchlist
 * @method get
 * @access private
 */
exports.getWatchlist = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User doesn\'t exist');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      message: 'Fetched watchlist successfully',
      watchlist: user.watchlist,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Add new item to watchlist
 * @method post
 * @access private
 */
exports.addItemToWatchlist = async (req, res, next) => {
  const { id, title, release_date, poster_path, overview, vote_average, isMovie } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User doesn\'t exist');
      error.statusCode = 404;
      throw error;
    }
    const item = user.watchlist.find(i => i.id === id.toString());
    if (item) {
      const error = new Error('Item already exist');
      error.statusCode = 401;
      throw error;
    }
    const watchlistItem = {
      id,
      title,
      release_date,
      poster_path,
      overview,
      vote_average,
      isMovie,
    }
    user.watchlist.push(watchlistItem);
    await user.save();
    res.status(201).json({
      message: 'Post created successfully',
      watchlistItem,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Delete item from watchlist
 * @method delete
 * @access private
 */
exports.deleteItemFromWatchlist = async (req, res, next) => {
  const itemId = req.params.itemId;
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('User doesn\'t exist');
      error.statusCode = 404;
      throw error;
    }
    const item = user.watchlist.find((i) => i.id === itemId);
    user.watchlist = user.watchlist.filter(watchlistItem => {
      return watchlistItem.id !== item.id;
    });
    await user.save();
    res.status(200).json({
      message: 'Post deleted successfully',
      watchlistItem: item,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}