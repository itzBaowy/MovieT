import { useState, useEffect } from 'react';
import MovieService from '../../services/movie/MovieService.js';

const MOCK_MOVIES = [
  {
    id: 1,
    title: 'Vây Hãm: Kẻ Trừng Phạt',
    poster: 'https://image.tmdb.org/t/p/w500/cNtAslrDhk1i3IOZ16vF7df6M3a.jpg',
    rating: 8.2,
    genre: 'Hành động, Hình sự',
    duration: '128 phút',
    status: 'now_showing',
  },
  {
    id: 2,
    title: 'Hành Tinh Cát: Phần Hai',
    poster: 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nez7H.jpg',
    rating: 8.5,
    genre: 'Khoa học viễn tưởng',
    duration: '166 phút',
    status: 'now_showing',
  },
  {
    id: 3,
    title: 'Kẻ Theo Dõi',
    poster: 'https://image.tmdb.org/t/p/w500/lFR8WA4VGBsOpgSMwgJZpiFRRHB.jpg',
    rating: 7.8,
    genre: 'Kinh dị, Gerilim',
    duration: '105 phút',
    status: 'now_showing',
  },
  {
    id: 4,
    title: 'Những Kẻ Thao Túng',
    poster: 'https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fJQlzNR3hO.jpg',
    rating: 7.5,
    genre: 'Tâm lý, Hình sự',
    duration: '118 phút',
    status: 'now_showing',
  },
  {
    id: 5,
    title: 'Lật Mặt 7: Một Điều Ước',
    poster: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
    rating: 8.0,
    genre: 'Gia đình, Tâm lý',
    duration: '132 phút',
    status: 'now_showing',
  },
  {
    id: 6,
    title: 'Kung Fu Panda 4',
    poster: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
    rating: 7.2,
    genre: 'Hoạt hình, Phiêu lưu',
    duration: '94 phút',
    status: 'now_showing',
  },
  {
    id: 7,
    title: 'Deadpool & Wolverine',
    poster: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    rating: 8.7,
    genre: 'Hành động, Hài',
    duration: '127 phút',
    status: 'coming_soon',
  },
  {
    id: 8,
    title: 'Inside Out 2',
    poster: 'https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    rating: 8.3,
    genre: 'Hoạt hình, Gia đình',
    duration: '100 phút',
    status: 'coming_soon',
  },
];

export default function useGetNowShowing() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MovieService.getNowShowing();
        setData(response.data || response);
      } catch {
        // Fallback to mock data when API is unavailable
        setData(MOCK_MOVIES.filter((m) => m.status === 'now_showing'));
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { data, loading, error };
}
