const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/dbConfig');
const { errorHandler } = require('./middlewares/error');
const helmet = require('helmet');

const moviesRoutes = require('./routes/movies');
const seriesRoutes = require('./routes/series');
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');
const reviewsRoutes = require('./routes/reviews');

dotenv.config({ path: './config/config.env' });

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

// Body parser JSON
app.use(bodyParser.json());

// CORS
app.use(cors());

// Helmet
app.use(helmet())

// Routes
app.get('/', (req, res, next) => {
  res.send('Welcome to the Filmseeker API');
})
app.use('/api/movies', moviesRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);
app.use('/api/reviews', reviewsRoutes);

app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server is starting in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);



