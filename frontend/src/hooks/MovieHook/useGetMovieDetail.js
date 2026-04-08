import { useState, useEffect } from 'react';
import MovieService from '../../services/movie/MovieService.js';

export default function useGetMovieDetail(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await MovieService.getMovieById(id);
        const apiData = response.data?.metadata || response.data;
        
        // Transform the single object to match UI expectations
        const formattedData = {
          ...apiData,
          poster: apiData.image,
          genre: apiData.tags && apiData.tags.length > 0 ? apiData.tags.join(', ') : 'Unknown'
        };
        
        setMovie(formattedData);
      } catch (err) {
        setError(err.message || 'Lỗi khi lấy thông tin phim.');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
}
