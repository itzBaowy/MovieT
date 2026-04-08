import { useState, useEffect } from 'react';
import ShowtimeService from '../../services/showtime/ShowtimeService';

export default function useGetShowtimeDetail(showtimeId) {
  const [showtime, setShowtime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!showtimeId) return;

    const fetchShowtimeDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ShowtimeService.getShowtimeDetail(showtimeId);
        // data structure from backend: result.data (single showtime object)
        setShowtime(response.data);
      } catch (err) {
        console.error('Error fetching showtime detail:', err);
        setError(err.message || 'Failed to fetch showtime detail');
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimeDetail();
  }, [showtimeId]);

  return { showtime, loading, error };
}
