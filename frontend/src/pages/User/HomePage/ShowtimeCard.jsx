import { Link } from 'react-router-dom';

export default function ShowtimeCard({ showtime }) {
  return (
    <div className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 group hover:bg-surface-container transition-all">
      <div className="flex items-center gap-6 flex-1">
        <div className="w-16 h-16 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-4xl">movie</span>
        </div>
        <div>
          <h4 className="text-xl font-bold">{showtime.movieTitle}</h4>
          <div className="flex items-center gap-3 text-sm text-on-surface-variant mt-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">location_on</span> 
              {showtime.cinema}
            </span>
            <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
            <span>{showtime.format}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {showtime.times.map((time) => (
          <button key={time} className="px-5 py-2 rounded-lg bg-surface-container-highest border border-outline-variant/20 hover:border-primary/50 hover:bg-primary/10 transition-all font-medium">
            {time}
          </button>
        ))}
      </div>
      
      <Link to={`/seats?movie=${encodeURIComponent(showtime.movieTitle)}`} className="bg-secondary text-on-secondary px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(161,142,255,0.4)] transition-all shrink-0">
        Chọn ghế
      </Link>
    </div>
  );
}
