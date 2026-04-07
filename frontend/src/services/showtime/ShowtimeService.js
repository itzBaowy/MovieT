import axiosInstance from '../../configs/axios.js';

const ShowtimeService = {
  getShowtimesByDate: (date) => axiosInstance.get('/showtimes', { params: { date } }),
  getShowtimesByMovie: (movieId) => axiosInstance.get(`/showtimes/movie/${movieId}`),
  getTodayShowtimes: () => axiosInstance.get('/showtimes/today'),
};

export default ShowtimeService;
