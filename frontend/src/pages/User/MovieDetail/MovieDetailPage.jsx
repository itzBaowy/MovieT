import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function MovieDetailPage() {
  const { id } = useParams();

  // Mock data based on the Stitch design
  const movie = {
    title: "Hành Tinh Cát: Phần Hai",
    originalTitle: "Dune: Part Two",
    genres: ["Action", "Adventure", "Sci-Fi"],
    rating: 8.5,
    duration: 166,
    year: 2024,
    subtitle: "Việt Sub",
    synopsis: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
    director: {
      name: "Denis Villeneuve",
      role: "Visionary Director",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0k8-md8C4VYztkQx31ASbLQs6CgkXyRzaLSCno6-TySIqnELywaiOHcMvkQealSIs4oGCREa-8pI6E1GqqgKiFI3dSQ4rBEc1ouHA66SbLKrudjp8_3cUWS1gxSrCIJFNlq1LO8mrPTCSJ7tJJzHQuYEajDvBw0-F11jGvCGEFrxLT2Rm_4bZ56AlvTPVAbSu2bkXEUPkcJlUSeL1TYEnY_GKxwMQ1zq3pUWX_QxUehKbD2fr6VCiim37oXOCpjc5H2Vj62euewg"
    },
    production: [
      "Warner Bros. Pictures",
      "Legendary Entertainment"
    ],
    cast: [
      { name: "Timothée Chalamet", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs7nd8q2I6Xiw4dOa9vk2uUbLZBmJJXLUxTbR1eUmRq2-VavylI7WwoCyZJVDMLwc682D4giEwj4AZGc1HBqTp2y8ONsDpb_SSe51wnnUQEXjuMzEN8ta_iHTIo5T296WloX3XYjpSngM6DRFZoHEkHBFtLryH0tb-5iSfP2pgXitiH7oUMjP7I16NzTkWejMnGYwwl5yuplLDnmJU0ivu-B6btffm6ZK284Sy4IZWxrl7jM7bycGpxD2e4rNRlOy9zCfj72fxLzU" },
      { name: "Zendaya", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMbymMQwcFQIZYXcy6oys3w5oi4ooYNjaxkOmGeWdhty76JBPsXva73vczVfd2Ejyx05H9ehE320EBkc8Zkxpx1tdF3O6W3oztOsY8-k4P1harzN-2o0_Ss0CeO8M-hiGXePOSoh62arZJ-YjIXifv39G1Wxnipb-AJ5rT4zratwGbGgc_4PcUrrUKxViDOVv6AiyY7xwSEzrxtuPFQNgPVn0XUiw60bPWjQ0Up2d8td3vrNIqfJsoENHtMu_emoeTIiNDjNznkEw" },
      { name: "Rebecca Ferguson", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC_8vfRKP5wI4fE6DdNCgm3mRPEegWb2drWGoICxhW_iN34RC8oQv49J9uOocYm5l60UPw-1ZDOtHPpdBI4BzOyVYExO0_0ou6apHahMv4ENvs_dGJcuy4vM6DGnuGwazZYT1zKlg5I6Ruq1SoswRtE4r5bR7sHYRldEqzodMXjlXs-NBfNl5h1HFpZdR2Y2ZBtog_RZiueGSpQPs1jHh_WSA7yEQhWGTW6-t_ti2ghkmZnRqRKk5-ND3VnL8mqFqVyARiB25rnGg" }
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdEyZqh77xeZN1WGwrRX5BggqiBz-1NdghuAElXbUMMT8IJanOBCle4lnOg6lPmlfY8M-bkvRTqjsOQYmQ7PfP6w8TGH6zwJG64ZRSV307HK8HF-qqKinheEzodKGu8S7JUn9qddNAXJuQBIUQkvsqAyXWqHfZDUImubE-LKhod4if_8cjpGJ2fCyAnsUaIqFX1WChTV503z9feyxvyMo5Jk9Gv25824Bq9CtMXxy0F6l40jA_aSdQ3lwbdCiHq9K9xG697phMw_U"
  };

  const showtimes = [
    {
      cinema: "CGV Vincom Center",
      times: ["10:30", "14:15", "18:45"]
    },
    {
      cinema: "Lotte Cinema Go Vap",
      times: ["11:00", "15:30", "21:00"]
    }
  ];

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
              alt="Movie Hero" 
              src={movie.heroImage}
            />
            <div className="absolute inset-0 hero-gradient"></div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end container mx-auto px-6 pb-16 lg:pb-24">
            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap gap-3 items-center">
                {movie.genres.map((genre, index) => (
                  <span key={index} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase border border-primary/30">
                    {genre}
                  </span>
                ))}
                <div className="flex items-center gap-1 ml-2">
                  <span className="material-symbols-outlined text-tertiary" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                  <span className="font-headline font-bold text-lg">{movie.rating}</span>
                  <span className="text-on-surface-variant text-sm ml-1">/ 10</span>
                </div>
              </div>
              <h1 className="text-5xl lg:text-8xl font-headline font-extrabold tracking-tighter text-glow leading-tight">
                Hành Tinh Cát: <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Phần Hai</span>
              </h1>
              <div className="flex flex-wrap items-center gap-8 text-on-surface-variant">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">schedule</span>
                  <span className="font-medium">{movie.duration} mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">calendar_today</span>
                  <span className="font-medium">{movie.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">language</span>
                  <span className="font-medium">{movie.subtitle}</span>
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
                {movie.synopsis}
              </p>
              
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Director</h4>
                  <div className="flex items-center gap-4 group">
                    <div className="w-14 h-14 rounded-full bg-surface-container overflow-hidden">
                      <img className="w-full h-full object-cover" alt="Director" src={movie.director.image} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">{movie.director.name}</p>
                      <p className="text-on-surface-variant text-sm">{movie.director.role}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Production</h4>
                  {movie.production.map((prod, idx) => (
                    <p key={idx} className="font-bold text-lg">{prod}</p>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <h4 className="text-primary font-bold text-sm uppercase tracking-widest mb-6">Cast</h4>
                <div className="flex flex-wrap gap-4">
                  {movie.cast.map((actor, idx) => (
                    <div key={idx} className="glass-panel p-3 pr-6 rounded-full flex items-center gap-3 border border-outline-variant/10">
                      <img className="w-10 h-10 rounded-full object-cover" alt={actor.name} src={actor.image} />
                      <span className="font-medium text-sm">{actor.name}</span>
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
                  <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl bg-primary text-on-primary-container shadow-lg shadow-primary/20">
                    <span className="text-xs font-bold">Today</span>
                    <span className="text-xl font-extrabold tracking-tighter">24</span>
                  </button>
                  <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl bg-surface-container hover:bg-surface-bright transition-colors">
                    <span className="text-xs font-medium text-on-surface-variant">May</span>
                    <span className="text-xl font-extrabold tracking-tighter">25</span>
                  </button>
                  <button className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-20 rounded-2xl bg-surface-container hover:bg-surface-bright transition-colors">
                    <span className="text-xs font-medium text-on-surface-variant">May</span>
                    <span className="text-xl font-extrabold tracking-tighter">26</span>
                  </button>
                </div>

                {/* Cinemas */}
                <div className="space-y-8">
                  {showtimes.map((st, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">location_on</span>
                        <h4 className="font-bold text-on-surface">{st.cinema}</h4>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {st.times.map((time, tIdx) => (
                          <Link 
                            key={tIdx} 
                            to={`/booking/seats/${id}-${idx}-${tIdx}`} 
                            className="py-2.5 rounded-xl bg-surface-container border border-outline-variant/10 text-sm font-bold hover:bg-primary hover:text-on-primary-container transition-all flex items-center justify-center"
                          >
                            {time}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
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
