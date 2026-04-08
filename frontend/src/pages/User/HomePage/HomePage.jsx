import useGetNowShowing from "../../../hooks/MovieHook/useGetNowShowing";
import useGetTodayShowtimes from "../../../hooks/ShowtimeHook/useGetTodayShowtimes";
import QuickBookingBar from "./QuickBookingBar";
import MovieCard from "./MovieCard";
import ShowtimeCard from "./ShowtimeCard";

export default function HomePage() {
  const { movies, loading: loadingMovies } = useGetNowShowing();
  const { showtimes, loading: loadingShowtimes } = useGetTodayShowtimes();

  // Sử dụng dữ liệu thật từ API, chỉ lấy 4 phim đầu tiên cho HomePage
  const displayMovies = movies?.length > 0 ? movies.slice(0, 4) : [];

  const mockStitchShowtimes = [
    {
      movieTitle: "Lật Mặt 7: Một Điều Ước",
      cinema: "CGV Vincom Center",
      format: "2D Phụ đề",
      times: ["14:30", "17:45", "20:15", "22:30"]
    },
    {
      movieTitle: "Kung Fu Panda 4",
      cinema: "Lotte Cinema Gò Vấp",
      format: "3D Lồng tiếng",
      times: ["10:00", "13:15", "15:40"]
    }
  ];
  const displayShowtimes = showtimes?.length > 0 ? showtimes : mockStitchShowtimes;

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[870px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-[0.3]"
            alt="Hero Background"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCT-Lk75IDConizDuZUu6wwEO2xSk2i_7-DNatejVOHvjvSg0W80J91zOBmCrTW7UWGcK9y_62JDlR2Fs518JcDVwiv871GcUUB550oEtZ4jG4ep9zJX1pcxCcjLsKKXNXHTqIcMqf0Vz3TfAzujsDIRe1JgxIE0jQSJMuBsvUKZ_Nrm4lhoX3n-_AezZOQPdZETdHyJ3RkMtezwUD_qigKJ9OnLTkgDJR60cUxcaEiKrTK7UyyIscZ0ADOB-7MbVxk9zmGdfDbT8A"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold font-headline mb-6 tracking-tight text-on-surface">
            Đặt vé phim trong <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">10 giây</span>
          </h1>
          <p className="text-xl md:text-2xl text-on-surface-variant mb-12 font-medium">
            Nhanh chóng, tiện lợi, trải nghiệm điện ảnh đỉnh cao
          </p>

          {/* Quick Booking Bar */}
          <QuickBookingBar />
        </div>
      </section>

      {/* Movie Section */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-2">Phim Đang Chiếu</h2>
              <div className="h-1.5 w-12 bg-tertiary rounded-full"></div>
            </div>
            <a className="text-primary font-semibold hover:underline flex items-center gap-1" href="#all-movies">
              Xem tất cả
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>

      {/* Showtime Section */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-headline mb-4">Suất Chiếu Hôm Nay</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Tìm kiếm các rạp chiếu phim gần bạn với những khung giờ thuận tiện nhất để tận hưởng những thước phim tuyệt đỉnh.
            </p>
          </div>
          <div className="space-y-4">
            {displayShowtimes.map((showtime, index) => (
              <ShowtimeCard key={index} showtime={showtime} />
            ))}
          </div>
        </div>
      </section>

      {/* My Tickets Section (Example of Bento-ish layout) */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold font-headline mb-12">Vé Của Tôi</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Ticket Card Main */}
            <div className="lg:col-span-2 glass-panel p-8 rounded-3xl relative overflow-hidden flex flex-col md:flex-row gap-8">
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-tertiary/10 rounded-full blur-[80px]"></div>
              <div className="w-full md:w-48 aspect-[2/3] rounded-xl overflow-hidden shadow-xl shrink-0">
                <img
                  className="w-full h-full object-cover"
                  alt="Dune Poster"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ1Jeo4tcVK08hnOk7kyiJHtnwDr4JKm6XzMe1dT8SCaI4GPiYn5NzyaDOoWz8aQre7cbcLQQCTsfIBcoCnvlVE_8oAkn-wAYTASYWHLOjS_hQOl4UyRejxeFCilh3pPFJIOpIbglipHawV7QF5dD6d9v1vgXo23G7LJjdzQ2lkIIv364JTKUddatgRp9TGmW6vdWJmGmO5OsZQUbHDBHcbcgaE6LJxtxqctiWlZT3QySNRe4K4XWYRI-78f59RqrwuJYhyTY2NB8"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">Hành Tinh Cát: Phần Hai</h3>
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Đã thanh toán</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
                    <div>
                      <p className="text-on-surface-variant mb-1">Rạp chiếu</p>
                      <p className="font-bold">CGV Vincom Center - P7</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant mb-1">Thời gian</p>
                      <p className="font-bold">20:15 - 24/05/2024</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant mb-1">Ghế ngồi</p>
                      <p className="font-bold">H12, H13</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant mb-1">Mã đặt vé</p>
                      <p className="font-bold">MT-8829-QX</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-outline-variant/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary">qr_code_2</span>
                    </div>
                    <span className="text-xs text-on-surface-variant">Xuất trình mã tại rạp</span>
                  </div>
                  <button className="text-tertiary font-bold flex items-center gap-1 hover:underline bg-transparent border-none outline-none cursor-pointer">
                    Chi tiết vé
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Mini Ticket History */}
            <div className="flex flex-col gap-4">
              <div className="bg-surface-container p-6 rounded-3xl flex items-center gap-4 border border-outline-variant/5">
                <div className="w-12 h-16 rounded-lg bg-surface-container-highest overflow-hidden">
                  <img
                    className="w-full h-full object-cover grayscale opacity-50"
                    alt="Ticket 1"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXdyASF-TxT1kfKiNSHu6VcRFVGLRfeBmtiOzZFwP82-jSrA2NqwekeUkH88Yx026wBQdZG5-VJnpEdpXefG5gMMS-xoMYiWkZoENeL96LxGIjzoL7ABGdrL7RKlPMkgdsKIHTFm06XVmKxsNmK-ASZDXxcyrriDF-z2muPISB_psEZXllXtucxr7Z-KZhTijIZoaawCUay5Xod5Zqx5GNYBinxUsG5m3X89ySoEy-bduMlUP5iD0DH0phcMuLgWvtkbZmrNc73E"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Vây Hãm: Kẻ Trừng Phạt</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Đã hoàn thành • 12/05</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">check_circle</span>
              </div>

              <div className="bg-surface-container p-6 rounded-3xl flex items-center gap-4 border border-outline-variant/5">
                <div className="w-12 h-16 rounded-lg bg-surface-container-highest overflow-hidden">
                  <img
                    className="w-full h-full object-cover grayscale opacity-50"
                    alt="Ticket 2"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9h9amQvog75DbIEzgwxCCgWFoV9kPhn8Wo7b8F0ZAoHxV2sdSFpi0l-9vGcQiGx-at1T9_0QNvP-xYhjoSdatvYJ0QD-uMOW46BWVUJIiUzk7EvJEIz0RRzBOazrmzW7ZLrYqASIAIhNlTHcN4iPkcd59HrYZSlBe78EtpqVXnOW6j1kdC_EWWPFHTR6mj3hGCPI2YyPZx2aFGMl5W2_CTREkk0vT8rKBtjETniky49I95M1It1KvYRYZz9QJzrDx7dopwvjqbzg"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Kẻ Theo Dõi</h4>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Đã hoàn thành • 08/05</p>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant">check_circle</span>
              </div>

              <div className="flex-1 glass-panel rounded-3xl p-6 flex flex-col items-center justify-center text-center border-dashed border-2 border-outline-variant/20 cursor-pointer hover:bg-surface-container transition-colors">
                <span className="material-symbols-outlined text-primary-container text-4xl mb-2">add_circle</span>
                <p className="text-sm font-bold">Đặt phim mới</p>
                <p className="text-xs text-on-surface-variant mt-1">Khám phá hàng ngàn phim hay</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
