import axiosClient from '../../configs/axiosConfig.js';

const MovieService = {
  getNowShowing: () => axiosClient.get('/movies/now-showing'),
  getComingSoon: () => axiosClient.get('/movies/coming-soon'),
  getMovieById: (id) => axiosClient.get(`/movies/${id}`),
  searchMovies: (query) => axiosClient.get('/movies/search', { params: { q: query } }),
};

export default MovieService;
