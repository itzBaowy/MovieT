export default function QuickBookingBar() {
  return (
    <div className="glass-panel p-2 rounded-2xl md:rounded-full flex flex-col md:flex-row gap-2 max-w-5xl mx-auto shadow-2xl">
      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
        <button className="flex flex-col items-start px-6 py-3 hover:bg-surface-bright rounded-xl md:rounded-full transition-colors group">
          <span className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">Chọn Phim</span>
          <span className="text-sm font-semibold truncate w-full text-left text-on-surface">Tất cả phim</span>
        </button>
        <button className="flex flex-col items-start px-6 py-3 hover:bg-surface-bright rounded-xl md:rounded-full transition-colors border-l border-outline-variant/10">
          <span className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">Chọn Rạp</span>
          <span className="text-sm font-semibold truncate w-full text-left text-on-surface">Gần bạn nhất</span>
        </button>
        <button className="flex flex-col items-start px-6 py-3 hover:bg-surface-bright rounded-xl md:rounded-full transition-colors border-l border-outline-variant/10">
          <span className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">Ngày xem</span>
          <span className="text-sm font-semibold truncate w-full text-left text-on-surface">Hôm nay, 24/05</span>
        </button>
        <button className="flex flex-col items-start px-6 py-3 hover:bg-surface-bright rounded-xl md:rounded-full transition-colors border-l border-outline-variant/10">
          <span className="text-[10px] uppercase tracking-widest text-primary/70 font-bold mb-1">Suất chiếu</span>
          <span className="text-sm font-semibold truncate w-full text-left text-on-surface">Chọn giờ</span>
        </button>
      </div>
      <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-10 py-4 md:py-0 rounded-xl md:rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(187,184,244,0.4)] transition-all active:scale-95 whitespace-nowrap">
        Tìm suất chiếu
      </button>
    </div>
  );
}
