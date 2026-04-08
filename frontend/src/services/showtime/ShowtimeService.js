import axiosInstance from '../../configs/axios.js';

const ShowtimeService = {
  getShowtimesByMovie: (movieId) => axiosInstance.get(`/movies/${movieId}/showtimes`),
  getShowtimeDetail: (showtimeId) => axiosInstance.get(`/showtimes/${showtimeId}`),
  bookSeats: (showtimeId, payload) => axiosInstance.post(`/showtimes/${showtimeId}/book`, payload),
};

export default ShowtimeService;
