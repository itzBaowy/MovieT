import { useState, useEffect } from 'react';
import ShowtimeService from '../../services/showtime/ShowtimeService.js';

const MOCK_SHOWTIMES = [
  {
    id: 1,
    movieTitle: 'Lật Mặt 7: Một Điều Ước',
    cinema: 'CGV Vincom Center',
    hall: 'P7',
    times: ['10:30', '13:15', '16:00', '19:45', '22:30'],
    format: 'IMAX',
  },
  {
    id: 2,
    movieTitle: 'Kung Fu Panda 4',
    cinema: 'Lotte Cinema Gò Vấp',
    hall: 'P3',
    times: ['09:00', '11:30', '14:00', '17:30', '20:00'],
    format: '3D',
  },
  {
    id: 3,
    movieTitle: 'Hành Tinh Cát: Phần Hai',
    cinema: 'CGV Aeon Mall',
    hall: 'P1',
    times: ['10:00', '14:30', '18:00', '21:00'],
    format: 'IMAX',
  },
];

export default function useGetTodayShowtimes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShowtimes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await ShowtimeService.getTodayShowtimes();
        setData(response.data || response);
      } catch {
        setData(MOCK_SHOWTIMES);
      } finally {
        setLoading(false);
      }
    };

    fetchShowtimes();
  }, []);

  return { data, loading, error };
}
