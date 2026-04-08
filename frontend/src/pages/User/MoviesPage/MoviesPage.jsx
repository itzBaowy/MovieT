import { useState } from 'react';
import { Link } from 'react-router-dom';
import useGetNowShowing from '../../../hooks/MovieHook/useGetNowShowing';
import useGetComingSoon from '../../../hooks/MovieHook/useGetComingSoon';

const ALL_TAGS = ['Tất cả', 'Action', 'Drama', 'Sci-Fi', 'Animation', 'Comedy', 'Horror', 'Crime', 'Family'];

function SkeletonCard() {
  return (
    <div className="bg-surface-container rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-surface-container-highest" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-surface-container-highest rounded-full w-3/4" />
        <div className="h-3 bg-surface-container-highest rounded-full w-1/2" />
      </div>
    </div>
  );
}

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative bg-surface-container rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-container-highest">
        <img
          src={movie.image || movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(movie.title)}&size=300&background=1a1823&color=bbb8f4`; }}
        />
        {/* Rating badge */}
        <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 border border-white/10">
          <span className="material-symbols-outlined text-tertiary" style={{ fontSize: 12, fontVariationSettings: "'FILL' 1" }}>star</span>
          <span className="text-on-surface">{movie.rating?.toFixed(1) || 'N/A'}</span>
        </div>
        {/* Status badge */}
        <div className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${movie.status === 'NOW_SHOWING' ? 'bg-emerald-500/90 text-white' : 'bg-amber-500/90 text-white'}`}>
          {movie.status === 'NOW_SHOWING' ? 'Đang chiếu' : 'Sắp chiếu'}
        </div>
        {/* CTA overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
          <span className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="material-symbols-outlined text-sm">local_activity</span>
            Đặt vé ngay
          </span>
        </div>
      </div>
      <div className="p-3.5">
        <h3 className="font-bold text-on-surface text-sm line-clamp-1 group-hover:text-primary transition-colors">{movie.title}</h3>
        {movie.subTitle && <p className="text-on-surface-variant text-xs mt-0.5 line-clamp-1 italic">{movie.subTitle}</p>}
        <div className="flex items-center gap-3 mt-2 text-[11px] text-on-surface-variant">
          {movie.duration && (
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined" style={{ fontSize: 12 }}>schedule</span>
              {movie.duration}p
            </span>
          )}
          {movie.tags?.length > 0 && (
            <span className="truncate">{movie.tags.slice(0, 2).join(' • ')}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function MoviesPage() {
  const { movies: nowShowing, loading: loadingNow } = useGetNowShowing();
  const { movies: comingSoon, loading: loadingComing } = useGetComingSoon();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allMovies = [...(nowShowing || []), ...(comingSoon || [])];
  const loading = loadingNow || loadingComing;

  const filteredMovies = allMovies.filter(movie => {
    const matchStatus = activeStatus === 'all' || movie.status === activeStatus;
    const matchTag = activeFilter === 'Tất cả' || (movie.tags || []).includes(activeFilter);
    const matchSearch = !searchQuery ||
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (movie.subTitle || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (movie.director || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchTag && matchSearch;
  });

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative py-20 px-8 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-tertiary/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
            <div>
              <p className="text-tertiary font-bold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">movie</span>
                Thư viện phim
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold font-headline tracking-tight leading-none">
                Tất cả{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
                  bộ phim
                </span>
              </h1>
              <p className="text-on-surface-variant mt-3 text-lg">
                {loading ? 'Đang tải...' : `${allMovies.length} bộ phim đang có mặt tại MovieT`}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/20 rounded-2xl pl-12 pr-10 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 text-on-surface placeholder:text-on-surface-variant transition-all"
                placeholder="Tìm theo tên phim, đạo diễn..."
                type="text"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            {[
              { key: 'all', label: 'Tất cả', icon: 'theaters' },
              { key: 'NOW_SHOWING', label: 'Đang chiếu', icon: 'play_circle' },
              { key: 'COMING_SOON', label: 'Sắp chiếu', icon: 'schedule' },
            ].map(s => (
              <button
                key={s.key}
                onClick={() => setActiveStatus(s.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeStatus === s.key
                    ? 'bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-lg shadow-primary/20'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>

          {/* Genre Tag Filters */}
          <div className="flex gap-2 flex-wrap">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
                  activeFilter === tag
                    ? 'bg-tertiary/20 text-tertiary ring-1 ring-tertiary/50'
                    : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                {tag}
              </button>
            ))}
            {(activeFilter !== 'Tất cả' || activeStatus !== 'all' || searchQuery) && (
              <button
                onClick={() => { setActiveFilter('Tất cả'); setActiveStatus('all'); setSearchQuery(''); }}
                className="px-4 py-1.5 rounded-full text-xs font-bold text-error bg-error-container/20 hover:bg-error-container/40 transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">filter_list_off</span>
                Xóa bộ lọc
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Movies Grid */}
      <section className="pb-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
              {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="text-center py-32">
              <span className="material-symbols-outlined text-7xl text-on-surface-variant/40 mb-4 block">movie_filter</span>
              <p className="text-xl font-bold text-on-surface-variant">Không tìm thấy phim phù hợp</p>
              <p className="text-sm text-on-surface-variant mt-2">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between py-6">
                <p className="text-sm text-on-surface-variant">
                  Hiển thị <span className="text-on-surface font-bold">{filteredMovies.length}</span> kết quả
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
                {filteredMovies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
