const apiClient = require('../config/axios');

/**
 * @description Get On Air Series
 * @query page: page number
 * @method get
 * @access public
 */
exports.onAirSeries = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  try {
    const series = await apiClient.get(`/tv/on_the_air?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`);

    const seriesResult = series.data.results.map((series) => {
      return {
        ...series,
        poster_path: `${process.env.TMDB_POSTER}${series.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${series.backdrop_path}`,
      }
    });

    res.status(200).json({
      message: 'On Air Series Fetched Successfully',
      series: seriesResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Get Latest Series
 * @query page: page number
 * @method get
 * @access public
 */
exports.popularSeries = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  try {
    const series = await apiClient.get(`/tv/popular?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`);
    const seriesResult = series.data.results.map((series) => {
      return {
        ...series,
        poster_path: `${process.env.TMDB_POSTER}${series.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${series.backdrop_path}`,
      }
    });

    res.status(200).json({
      message: 'Popular Series Fetched Successfully',
      series: seriesResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Get Top Rated Series
 * @query page: page number
 * @method get
 * @access public
 */
exports.topRatedSeries = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  try {
    const series = await apiClient.get(`/tv/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${currentPage}`);
    const seriesResult = series.data.results.map((series) => {
      return {
        ...series,
        poster_path: `${process.env.TMDB_POSTER}${series.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${series.backdrop_path}`,
      }
    });

    res.status(200).json({
      message: 'Top Rated Series Fetched Successfully',
      series: seriesResult,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

/**
 * @description Get Series Details
 * @param id: seriesId
 * @method get
 * @access public
 */
exports.getSeriesDetails = async (req, res, next) => {
  const seriesId = req.params.id;
  try {
    const seriesData = await apiClient.get(`/tv/${seriesId}?api_key=${process.env.API_KEY}&language=en-US`);
    const seriesCredits = await apiClient.get(`/tv/${seriesId}/credits?api_key=${process.env.API_KEY}&language=en-US`);
    const recommendedSeries = await apiClient.get(`/tv/${seriesId}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`);
    // const similarSeries = await apiClient.get(`/tv/${seriesId}/similar?api_key=${process.env.API_KEY}&language=en-US&page=1`);

    const seriesCreditsWithImage = seriesCredits.data.cast.map(item => {
      return {
        ...item,
        profile_path: `${process.env.TMDB_POSTER}${item.profile_path}`
      }
    });

    const recommendedSeriesWithImage = recommendedSeries.data.results.map(item => {
      return {
        ...item,
        poster_path: `${process.env.TMDB_POSTER}${item.poster_path}`,
        backdrop_path: `${process.env.TMDB_BACKDROP}${item.backdrop_path}`
      }
    })

    res.status(200).json({
      message: 'Series Details Fetched Successfully',
      series: {
        details: {
          ...seriesData.data,
          poster_path: `${process.env.TMDB_POSTER}${seriesData.data.poster_path}`,
          backdrop_path: `${process.env.TMDB_BACKDROP}${seriesData.data.backdrop_path}`,
        },
        credits: seriesCreditsWithImage,
        recommended: recommendedSeriesWithImage,
      }
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}