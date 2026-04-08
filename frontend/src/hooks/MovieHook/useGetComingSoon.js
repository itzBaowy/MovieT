import { useState, useEffect } from 'react';
import MovieService from '../../services/movie/MovieService.js';

export default function useGetComingSoon() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MovieService.getComingSoon();
        // Lấy array phim từ response
        const apiData = response.data?.metadata || response.data || [];
        
        // Transform the list to match UI's expectations
        const formattedData = apiData.map(movie => ({
          ...movie,
          poster: movie.image,
          genre: movie.tags && movie.tags.length > 0 ? movie.tags.join(', ') : 'Unknown'
        }));
        
        setData(formattedData);
      } catch (err) {
        setError(err.message || 'Lỗi khi lấy danh sách phim.');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies: data, loading, error };
}
