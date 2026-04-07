import axiosInstance from '../../configs/axios.js';

const MovieService = {
  getNowShowing: () => axiosInstance.get('/movies/now-showing'),
  getComingSoon: () => axiosInstance.get('/movies/coming-soon'),
  getMovieById: (id) => axiosInstance.get(`/movies/${id}`),
  searchMovies: (query) => axiosInstance.get('/movies/search', { params: { q: query } }),
};

export default MovieService;
