const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  watchlist: [
    {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true,
      },
      poster_path: {
        type: String,
        required: true,
      },
      release_date: {
        type: String,
        required: true,
      },
      vote_average: {
        type: Number,
        required: true,
      },
      overview: {
        type: String,
        required: true,
      },
      isMovie: {
        type: Boolean,
        required: true,
      }
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);
