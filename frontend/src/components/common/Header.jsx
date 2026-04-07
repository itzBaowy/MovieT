import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/60 backdrop-blur-xl flex justify-between items-center px-8 h-20 max-w-none shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-400 font-headline tracking-tight">
        MovieT
      </Link>
      
      <div className="hidden md:flex gap-8 items-center">
        <Link to="/movies" className="text-violet-300 font-bold border-b-2 border-violet-400 pb-1 font-headline tracking-tight hover:text-violet-200 hover:backdrop-brightness-125 transition-all duration-300">Phim</Link>
        <Link to="/cinemas" className="text-gray-400 font-medium font-headline tracking-tight hover:text-violet-200 hover:backdrop-brightness-125 transition-all duration-300">Rạp</Link>
        <Link to="/showtimes" className="text-gray-400 font-medium font-headline tracking-tight hover:text-violet-200 hover:backdrop-brightness-125 transition-all duration-300">Lịch chiếu</Link>
        <Link to="/my-tickets" className="text-gray-400 font-medium font-headline tracking-tight hover:text-violet-200 hover:backdrop-brightness-125 transition-all duration-300">Vé của tôi</Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          <input className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary/40 w-64 text-on-surface" placeholder="Tìm kiếm phim..." type="text"/>
        </div>
        <Link to="/login" className="flex items-center gap-2 text-violet-200 font-headline tracking-tight scale-95 active:scale-90 transition-transform">
          <span className="material-symbols-outlined">account_circle</span>
          <span>Đăng nhập</span>
        </Link>
      </div>
    </nav>
  );
}
