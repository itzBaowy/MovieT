import axiosClient from '../../configs/axiosConfig.js';

const ShowtimeService = {
  getShowtimesByDate: (date) => axiosClient.get('/showtimes', { params: { date } }),
  getShowtimesByMovie: (movieId) => axiosClient.get(`/showtimes/movie/${movieId}`),
  getTodayShowtimes: () => axiosClient.get('/showtimes/today'),
};

export default ShowtimeService;
