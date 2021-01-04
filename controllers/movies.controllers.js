const apiClient = require('../config/axios');

/**
 * @description Get Now Playing Movies
 * @query page: page number
 * @method get
 * @access public
 */
exports.nowPlayingMovies = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  try {
    const movies = await apiClient.get(`/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`);
    const moviesResult = movies.data.results.map((movie) => {
      return {
        ...movie,
        poster_path: `${process.env.TMDB_POSTER}${movie.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${movie.backdrop_path}`,
      }
    })

    res.status(200).json({
      message: 'Now Playing Movies Fetched Successfully',
      movies: moviesResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Get Popular Movies
 * @query page: page number
 * @method get
 * @access public
 */
exports.popularMovies = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  try {
    const movies = await apiClient.get(`/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`);
    const moviesResult = movies.data.results.map((movie) => {
      return {
        ...movie,
        poster_path: `${process.env.TMDB_POSTER}${movie.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${movie.backdrop_path}`,
      }
    })

    res.status(200).json({
      message: 'Popular Movies Fetched Successfully',
      movies: moviesResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Get Top Rated Movies
 * @query page: page number
 * @method get
 * @access public
 */
exports.topRatedMovies = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  try {
    const movies = await apiClient.get(`/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`);
    const moviesResult = movies.data.results.map((movie) => {
      return {
        ...movie,
        poster_path: `${process.env.TMDB_POSTER}${movie.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${movie.backdrop_path}`,
      }
    });

    res.status(200).json({
      message: 'Top Rated Movies Fetched Successfully',
      movies: moviesResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Get Upcoming Movies
 * @query page: page number
 * @method get
 * @access public
 */
exports.upcomingMovies = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  try {
    const movies = await apiClient.get(`/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`);
    const moviesResult = movies.data.results.map((movie) => {
      return {
        ...movie,
        poster_path: `${process.env.TMDB_POSTER}${movie.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${movie.backdrop_path}`,
      }
    });

    res.status(200).json({
      message: 'Upcoming Movies Fetched Successfully',
      movies: moviesResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Get Movie Details
 * @param id: movieId
 * @method get
 * @access public
 */
exports.getMovieDetails = async (req, res, next) => {
  const movieId = req.params.id;
  try {
    const movieData = await apiClient.get(`/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`);
    const movieCredits = await apiClient.get(`/movie/${movieId}/credits?api_key=${process.env.API_KEY}&language=en-US`);
    const recommendedMovies = await apiClient.get(`/movie/${movieId}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`);
    // const similarMovies = await apiClient.get(`/movie/${movieId}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`);

    const movieCreditsWithImage = movieCredits.data.cast.map(item => {
      return {
        ...item,
        profile_path: `${process.env.TMDB_POSTER}${item.profile_path}`
      }
    });

    const recommendedMoviesWithImage = recommendedMovies.data.results.map(item => {
      return {
        ...item,
        poster_path: `${process.env.TMDB_POSTER}${item.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${item.backdrop_path}`
      }
    })

    res.status(200).json({
      message: 'Movie Details Fetched Successfully',
      movie: {
        details: {
          ...movieData.data,
          poster_path: `${process.env.TMDB_POSTER}${movieData.data.poster_path}`,
          backdrop_path: `${process.env.TMDB_BACKDROP}${movieData.data.backdrop_path}`,
        },
        credits: movieCreditsWithImage,
        recommended: recommendedMoviesWithImage,
      }
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Get Movie Details
 * @method get
 * @access public
 */
exports.movieSearch = async (req, res, next) => {
  const searchQuery = req.query.query || '';
  try {
    if (!searchQuery.length > 0) {
      const error = new Error('No query provided');
      error.statusCode = 404;
      throw error;
    }
    const movies = await apiClient.get(`/search/movie/?api_key=${process.env.API_KEY}&language=en-US&query=${searchQuery}&page=1&include_adult=false`);

    const moviesResult = movies.data.results.map((movie) => {
      return {
        ...movie,
        poster_path: `${process.env.TMDB_POSTER}${movie.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${movie.backdrop_path}`,
      }
    });

    res.status(200).json({
      message: 'Search Result Fetched Successfully',
      movies: moviesResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}