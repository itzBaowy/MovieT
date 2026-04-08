import { Link } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import useLogout from '../../hooks/AuthHook/useLogout';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const user = useAuthStore(state => state.user);
  const { logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-950/60 backdrop-blur-xl flex justify-between items-center px-8 h-20 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      <Link to="/" className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-400 font-headline tracking-tight">
        MovieT
      </Link>
      
      <div className="hidden md:flex gap-8 items-center">
        <Link to="/movies" className="text-violet-300 font-bold border-b-2 border-violet-400 pb-1 font-headline tracking-tight hover:text-violet-200 transition-all duration-300">Phim</Link>
        <Link to="/cinemas" className="text-gray-400 font-medium font-headline tracking-tight hover:text-violet-200 transition-all duration-300">Rạp</Link>
        <Link to="/showtimes" className="text-gray-400 font-medium font-headline tracking-tight hover:text-violet-200 transition-all duration-300">Lịch chiếu</Link>
        <Link to="/my-tickets" className="text-gray-400 font-medium font-headline tracking-tight hover:text-violet-200 transition-all duration-300">Vé của tôi</Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          <input className="bg-surface-container-low border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary/40 w-64 text-on-surface" placeholder="Tìm kiếm phim..." type="text"/>
        </div>

        {user ? (
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 bg-surface-container-low/50 hover:bg-surface-container-low p-2 pr-4 rounded-full transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all overflow-hidden border border-primary/30">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-xl">person</span>
                )}
              </div>
              <span className="text-sm font-semibold text-on-surface line-clamp-1 max-w-[100px]">
                {user.fullName || user.username}
              </span>
              <span className={`material-symbols-outlined text-outline text-sm transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-surface-container-high rounded-2xl shadow-2xl border border-outline-variant/15 py-2 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-variant/40 text-on-surface transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <span className="material-symbols-outlined text-xl">account_circle</span>
                  <span className="text-sm font-medium">Hồ sơ của tôi</span>
                </Link>
                <Link to="/my-tickets" className="flex items-center gap-3 px-4 py-3 hover:bg-surface-variant/40 text-on-surface transition-colors" onClick={() => setIsMenuOpen(false)}>
                  <span className="material-symbols-outlined text-xl">confirmation_number</span>
                  <span className="text-sm font-medium">Vé đã mua</span>
                </Link>
                <div className="h-[1px] bg-outline-variant/10 my-1"></div>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-error-container/20 text-error hover:text-error-fixed transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">logout</span>
                  <span className="text-sm font-medium">Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="flex items-center gap-2 text-violet-200 font-headline tracking-tight scale-95 active:scale-90 transition-transform">
            <span className="material-symbols-outlined">account_circle</span>
            <span>Đăng nhập</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
