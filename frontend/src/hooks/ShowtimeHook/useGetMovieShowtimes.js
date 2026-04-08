import { useState, useEffect } from 'react';
import ShowtimeService from '../../services/showtime/ShowtimeService';

export default function useGetMovieShowtimes(movieId) {
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchShowtimes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ShowtimeService.getShowtimesByMovie(movieId);
        // data structure from backend: result.data (which is the array of grouped showtimes)
        setShowtimes(response.data || []);
      } catch (err) {
        console.error('Error fetching showtimes:', err);
        setError(err.message || 'Failed to fetch showtimes');
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, [movieId]);

  return { showtimes, loading, error };
}
