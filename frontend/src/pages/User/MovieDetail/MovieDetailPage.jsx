import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import useGetMovieDetail from '../../../hooks/MovieHook/useGetMovieDetail';
import useGetMovieShowtimes from '../../../hooks/ShowtimeHook/useGetMovieShowtimes';

export default function MovieDetailPage() {
  const { id } = useParams();
  const { movie, loading, error } = useGetMovieDetail(id);
  const { showtimes: allShowtimes, loading: stLoading } = useGetMovieShowtimes(id);

  // Generate 7 days starting from today
  const dates = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        full: date.toISOString().split('T')[0],
        day: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        weekday: i === 0 ? 'Today' : date.toLocaleString('default', { weekday: 'short' })
      });
    }
    return days;
  }, []);

  const [selectedDate, setSelectedDate] = useState(dates[0].full);

  // Filter showtimes for selected date
  const filteredShowtimes = useMemo(() => {
    if (!allShowtimes) return [];
    
    return allShowtimes.map(group => ({
      ...group,
      showtimes: group.showtimes.filter(st => st.date === selectedDate)
    })).filter(group => group.showtimes.length > 0);
  }, [allShowtimes, selectedDate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-on-surface-variant font-medium animate-pulse">Đang tải thông tin phim...</p>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-error text-4xl">error</span>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Không tìm thấy phim</h2>
          <p className="text-on-surface-variant">Phim này có thể đã ngừng chiếu hoặc lỗi đường truyền.</p>
        </div>
        <Link to="/movies" className="bg-surface-container px-6 py-3 rounded-xl font-bold hover:bg-surface-bright transition-colors">
          Quay lại danh sách
        </Link>
      </div>
    );
  }

  const recommendations = [
    { id: 'br2049', title: "Blade Runner 2049", genres: "Action, Sci-Fi", rating: 8.2, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqRHVdQUYJnzMdlqcDd8MxwrakTfcWmygn47ZGeE5kg2ZeI0QJW3vtbzRe9ba90PB-b7SLa03fkjA15W5C42xr2V796xyaYPApmbBHzYupEgS1m8ZFjvvMght940NniINwHSuVCqFs9fJxBsJVM8dGVyf853D9Cc_x5rWOnkk2D9BQxbfSF4kQa_ujR5jJDvVAo104bLMV73EDt3CAVnLR1UFcDBw4jozMBVLuiTCYKWLy1yyXU9zWdk8JMWQ8UFW5i49GsINcNQA" },
    { id: 'interstellar', title: "Interstellar", genres: "Drama, Sci-Fi", rating: 8.8, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk-34Prk0qFuZvuqRJqwvnUw1tA7-cX1vFdYX5_oG8HGv0G802AB_V_8GZa63KjhqEqtinGi0apkBp7yOED1K4ipdKixGG7B3PG1jgLrKC_er9d2VuUdg-pmBiW1B5_xCnCr0Lsg3gbe9SLyG5LTlzzpVr4PtqJGT1hts_6I1kiui_YOYs-VmbMIDuCjmT0jfpeWrtkDkRg6vmBv9MBb5CVGdGEP08exaU1DbD_LOcXtKVp65Kt-68jai7NeGbJ8_IOlneBDowReo" },
    { id: 'gravity', title: "Gravity", genres: "Thriller, Sci-Fi", rating: 7.9, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCCK3vDTWqKQG_6oApbnWWpa1Z2bWG3jVoJqhnBb3nIgoysoWAZlLVUn8mGQKVTnougO-Xsq0TkRLP707H1AXkCgoLXG_x0I2pZGyQwIRxGLBtcRlWw6xTPxPtdxKT5_qjh5aFhbEgDDy04fCogTX3f6Ws4_2jvZ4RMtlCstDps-B5yQAgc6SiB_y6pJGVx04kPst9IjEvtBq6ur8vihti9kX0KTaFXzbM-GcWRUrTeeJEOpYkBkCOC8OfmkczNG1oioG45Ae4zWHY" },
    { id: 'martian', title: "The Martian", genres: "Adventure, Sci-Fi", rating: 8.0, image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFDmCmWuvzDI0029oEbVOAF_mPiRGbrMtrDc7HR5AqPQqUq_6ZRocJ9NU9PJEwIKuyvfdB9eU7asCsXsznSvMZWycIEGSgUwHX7WZNVFASx35kynYkEOjqgSG4a17Jx5qMJGB1YSbx9AyQST_eisf-xEC0DVsDZUPABYNl6p1clsv0J2ZNC99Wj-cxABo50xDKM3C3hs6YVfrKW5w0VgaL9XzfxIJ1W61jh33ApQHQ4nW3mP5LYI30DzfbAQO1Ny1chP2TJvGC9c4" }
  ];

  return (
    <div className="bg-background text-on-surface">
      <main className="pb-24 lg:pb-12">
        {/* Hero Section */}
        <section className="relative h-[870px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt={movie.title} 
              src={movie.background || movie.image || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format"}
            />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-6 pb-16 lg:pb-24">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap gap-3 items-center">
                {(movie.tags || []).map((genre, index) => (
                  <span key={index} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-primary/30">
                    {genre}
                  </span>
                ))}
                <div className="flex items-center gap-1 ml-2">
                  <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="font-headline font-bold text-lg">{movie.rating || 0}</span>
                  <span className="text-on-surface-variant text-sm ml-1">/ 10</span>
                </div>
              </div>
              <h1 className="text-5xl lg:text-8xl font-headline font-extrabold tracking-tighter text-glow leading-tight">
                {movie.title}
              </h1>
              {movie.subTitle && (
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  {movie.subTitle}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-8 text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">schedule</span>
                  <span className="font-medium">{movie.duration} mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">calendar_today</span>
                  <span className="font-medium">
                    {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">language</span>
                  <span className="font-medium">Phụ đề</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-transform active:scale-95 shadow-[0_0_20px_rgba(187,184,244,0.3)] cta-glow">
                  <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>play_arrow</span>
                  Xem Trailer
                </button>
                <button className="glass-panel px-8 py-4 rounded-xl font-bold flex items-center gap-3 border border-outline-variant/20 hover:bg-surface-bright/40 transition-colors">
                  <span className="material-symbols-outlined">bookmark</span>
                  Lưu phim
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="container mx-auto px-6 -mt-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Info Card */}
            <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border border-outline-variant/10 shadow-2xl">
              <h3 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-8 bg-tertiary rounded-full"></span>
                Nội dung phim
              </h3>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
                {movie.description || 'Chưa có thông tin cập nhật.'}
              </p>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Director</h4>
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-full bg-surface-container overflow-hidden">
                      <img className="w-full h-full object-cover" alt="Director" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(movie.director || 'Director')}`} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{movie.director || 'Unknown'}</p>
                      <p className="text-on-surface-variant text-sm">Director</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Production</h4>
                  <p className="font-bold text-lg">Studio Demo</p>
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-6">Cast</h4>
                <div className="flex flex-wrap gap-4">
                  {(movie.actors || []).map((actor, idx) => (
                    <div key={idx} className="glass-panel p-3 pr-6 rounded-full flex items-center gap-3 border border-outline-variant/10">
                      <img className="w-10 h-10 rounded-full object-cover" alt={actor} src={`https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}`} />
                      <span className="font-medium text-sm">{actor}</span>
                    </div>
                  ))}
                  <button className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary border border-outline-variant/10">
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Showtime Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-panel p-8 rounded-3xl border border-outline-variant/10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4">
                  <span className="material-symbols-outlined text-tertiary/20 text-6xl rotate-12">confirmation_number</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-6">Lịch chiếu</h3>
                
                {/* Date Selector */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                  {dates.map((d) => (
                    <button 
                      key={d.full}
                      onClick={() => setSelectedDate(d.full)}
                      className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all duration-300 ${
                        selectedDate === d.full 
                          ? 'bg-primary text-on-primary-container shadow-lg shadow-primary/20 scale-105' 
                          : 'bg-surface-container hover:bg-surface-bright text-on-surface-variant'
                      }`}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{d.weekday}</span>
                      <span className="text-xl font-extrabold tracking-tighter">{d.day}</span>
                      <span className="text-[9px] font-bold uppercase">{d.month}</span>
                    </button>
                  ))}
                </div>

                {/* Cinemas */}
                <div className="space-y-8">
                  {stLoading ? (
                    <div className="space-y-6">
                      {[1, 2].map(i => (
                        <div key={i} className="animate-pulse space-y-3">
                          <div className="h-5 bg-surface-container w-2/3 rounded"></div>
                          <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3].map(j => <div key={j} className="h-10 bg-surface-container rounded-xl"></div>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : filteredShowtimes.length > 0 ? (
                    filteredShowtimes.map((group, idx) => (
                      <div key={idx} className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-secondary">location_on</span>
                          <h4 className="font-bold text-on-surface">{group.cinema.name}</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {group.showtimes.map((st) => (
                            <Link 
                              key={st.id} 
                              to={`/booking/seats/${st.id}`} 
                              className="py-2.5 rounded-xl bg-surface-container border border-outline-variant/10 text-sm font-bold hover:bg-primary hover:text-on-primary-container transition-all flex items-center justify-center flex-col"
                            >
                              <span>{st.time}</span>
                              <span className="text-[9px] opacity-60 font-medium">{st.format}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 glass-panel rounded-2xl border border-outline-variant/10 bg-surface-container/30">
                      <span className="material-symbols-outlined text-on-surface-variant/20 text-5xl mb-3">event_busy</span>
                      <p className="text-on-surface-variant text-sm font-medium px-6">Rất tiếc, hiện chưa có suất chiếu nào cho ngày này.</p>
                    </div>
                  )}
                </div>

                <button className="w-full mt-10 py-4 bg-surface-container-highest rounded-2xl text-primary font-bold border border-primary/20 hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
                  Xem tất cả rạp
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
              </div>

              {/* Promo Card */}
              <div className="bg-gradient-to-br from-tertiary-container/30 to-background p-6 rounded-3xl border border-tertiary-container/20">
                <span className="bg-tertiary text-on-tertiary text-[10px] font-black px-2 py-0.5 rounded mb-3 inline-block uppercase">Hot Offer</span>
                <h4 className="font-bold text-lg leading-tight mb-2">Giảm 20% khi đặt qua ZaloPay</h4>
                <p className="text-on-surface-variant text-sm mb-4">Áp dụng cho mọi suất chiếu Dune 2 trong hôm nay.</p>
                <a className="text-tertiary text-sm font-bold underline underline-offset-4" href="#">Tìm hiểu thêm</a>
              </div>
            </div>
          </div>
        </section>

        {/* Recommended Section */}
        <section className="container mx-auto px-6 mt-20 mb-32">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-headline font-bold">Phim cùng thể loại</h2>
              <p className="text-on-surface-variant">Có thể bạn sẽ thích những bộ phim hành động viễn tưởng này</p>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform">
              Xem tất cả <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((rec, idx) => (
              <div key={idx} className="group cursor-pointer">
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[2/3] transition-transform duration-500 group-hover:scale-105">
                  <img className="w-full h-full object-cover" alt={rec.title} src={rec.image} />
                  <div className="absolute top-3 right-3 glass-panel px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-tertiary text-[14px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                    {rec.rating}
                  </div>
                </div>
                <h5 className="font-bold group-hover:text-primary transition-colors">{rec.title}</h5>
                <p className="text-on-surface-variant text-sm">{rec.genres}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
