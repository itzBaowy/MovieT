import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <div className="group relative bg-surface-container rounded-xl overflow-hidden movie-card-glow transition-all duration-300 hover:-translate-y-2">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          alt={movie.title}
          src={movie.poster}
        />
        <div className="absolute top-4 left-4 glass-panel px-2 py-1 rounded text-xs font-bold text-tertiary flex items-center gap-1">
          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          {movie.rating}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg mb-4 line-clamp-2 leading-tight">
          {movie.title}
        </h3>
        <div className="bg-surface-container-highest rounded-lg flex items-center justify-between p-1">
          <span className="text-xs text-on-surface-variant px-2 truncate w-[90px]" title={movie.genre}>{movie.genre}</span>
          <Link to={`/movies/${movie.id}`} className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary-container transition-colors shrink-0">
            Đặt vé
          </Link>
        </div>
      </div>
    </div>
  );
}
