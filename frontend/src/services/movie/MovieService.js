import axiosInstance from '../../configs/axios.js';

const MovieService = {
  getNowShowing: () => axiosInstance.get('/movies', { params: { status: 'NOW_SHOWING' } }),
  getComingSoon: () => axiosInstance.get('/movies', { params: { status: 'COMING_SOON' } }),
  getMovieById: (id) => axiosInstance.get(`/movies/${id}`),
  searchMovies: (query) => axiosInstance.get('/movies', { params: { title: query } }),
};

export default MovieService;
