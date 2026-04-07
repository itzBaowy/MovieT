import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function SeatsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock seats data
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  const [selectedSeats, setSelectedSeats] = useState(['D5', 'D6', 'H12', 'H13']);
  const occupiedSeats = ['B1', 'B2', 'B6', 'B7', 'H1', 'H2'];
  
  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(s => s !== seatId) 
        : [...prev, seatId]
    );
  };

  const ticketPrice = 120000;
  const totalPrice = selectedSeats.length * ticketPrice;

  return (
    <div className="bg-background text-on-background min-h-screen pb-40">
      {/* Custom Header for Seats Page */}
      <header className="fixed top-0 left-0 w-full z-50 bg-surface-container/60 backdrop-blur-md border-b border-outline-variant/15 shadow-2xl px-6 h-20 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-on-surface">arrow_back</span>
          </button>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-on-surface font-headline tracking-tighter">MovieT</span>
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Seat Selection</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-2xl">account_circle</span>
        </div>
      </header>

      <main className="pt-32 px-4 max-w-5xl mx-auto">
        {/* Movie Screen Indicator */}
        <div className="relative w-full mb-24">
          <div className="w-4/5 h-2 mx-auto bg-primary/40 rounded-full blur-md opacity-50"></div>
          <div className="w-full h-12 bg-gradient-to-b from-primary/20 to-transparent movie-screen-curve relative border-t border-primary/30">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-primary/60">Screen</span>
            </div>
          </div>
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/5 blur-[100px] pointer-events-none"></div>
        </div>

        {/* Seat Selection Grid */}
        <div className="seat-grid mb-16 overflow-x-auto pb-8 scrollbar-hide">
          <div className="seat-perspective flex flex-col gap-4 items-center min-w-[600px]">
            {rows.map(row => (
              <div key={row} className="flex gap-2 justify-center">
                <span className="w-6 text-[10px] text-outline self-center text-right pr-2">{row}</span>
                <div className="flex gap-2">
                  {columns.map(col => {
                    const seatId = `${row}${col}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    
                    return (
                      <React.Fragment key={col}>
                        {col === 3 || col === 8 ? <div className="w-8"></div> : null}
                        <button
                          onClick={() => toggleSeat(seatId)}
                          disabled={isOccupied}
                          className={`
                            w-8 h-8 rounded-lg transition-all duration-300
                            ${isOccupied 
                              ? 'bg-surface-dim opacity-30 border border-outline-variant/10 cursor-not-allowed' 
                              : isSelected
                                ? 'bg-secondary shadow-[0_0_15px_rgba(161,142,255,0.6)] border border-secondary/50 scale-110 z-10'
                                : 'bg-surface-container-highest/60 border border-outline-variant/30 backdrop-blur-sm hover:border-primary/50'
                            }
                          `}
                        >
                          {isSelected && <span className="text-[8px] font-bold text-on-secondary">{seatId}</span>}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend Section */}
        <div className="flex justify-center gap-8 py-8 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-surface-container-highest/60 border border-outline-variant/30"></div>
            <span className="text-xs text-on-surface-variant font-medium">Trống</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-surface-dim opacity-30 border border-outline-variant/10"></div>
            <span className="text-xs text-on-surface-variant font-medium">Đã đặt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-secondary shadow-[0_0_8px_rgba(161,142,255,0.6)]"></div>
            <span className="text-xs text-on-surface-variant font-medium">Đang chọn</span>
          </div>
        </div>

        {/* Movie Info Short */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 pb-20 items-center">
          <div className="md:col-span-3 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-xl blur opacity-25"></div>
            <div className="relative bg-surface-container-highest rounded-xl overflow-hidden aspect-[2/3] shadow-2xl">
              <img 
                className="w-full h-full object-cover" 
                alt="Movie Poster" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcP1OotyKiRqBEQoYldwUc3F1pgAYe9aHrOo2dL-7fl1CDJ7CRgINaqdivFqVc2E2TOtgnf_IRs1n_0Zwtut71GzLm9OBNuMktNgWexo3FAgX2RcoVQIV7GfN4TN5mTWZdXbxbE0FQZfrZX5wxZaZvyYU_E3WkTWcIqigr-Q27XsY-XLt15m_mXQSnxz07Pji297CYNOXU9OQNl-iGb80nOZPQG6IDXUWTAm-pjexpD97msUS82x5k7Ykjsdwp8YEfDaoNoYVRJLk" 
              />
            </div>
          </div>
          <div className="md:col-span-9">
            <h2 className="text-4xl font-black mb-4 tracking-tighter leading-tight font-headline">
              Hành Tinh Cát:<br/>Phần Hai
            </h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="px-3 py-1 bg-surface-variant/40 rounded-full border border-outline-variant/20 text-xs font-semibold text-primary uppercase">SCIFI / EPIC</span>
              <span className="px-3 py-1 bg-surface-variant/40 rounded-full border border-outline-variant/20 text-xs font-semibold text-primary">IMAX 2D</span>
              <span className="px-3 py-1 bg-surface-variant/40 rounded-full border border-outline-variant/20 text-xs font-semibold text-tertiary">13+</span>
            </div>
            <p className="text-on-surface-variant leading-relaxed max-w-xl text-sm italic">
              "Hành trình của Paul Atreides khi anh hợp nhất với Chani và người Fremen trong khi đang đi trên con đường trả thù những kẻ đã tiêu diệt gia đình mình."
            </p>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Panel */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:p-6">
        <div className="max-w-5xl mx-auto bg-surface-container/80 backdrop-blur-xl rounded-3xl p-6 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center w-full md:w-auto">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Suất chiếu</span>
              <span className="text-sm font-bold text-on-surface">Galaxy Cinema • 19:30</span>
            </div>
            <div className="flex flex-col border-l border-outline-variant/20 pl-6">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Ghế đã chọn</span>
              <span className="text-sm font-bold text-secondary truncate max-w-[150px]">
                {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Chưa chọn'}
              </span>
            </div>
            <div className="flex flex-col border-l border-outline-variant/20 pl-6 hidden md:flex">
              <span className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Tổng tiền</span>
              <span className="text-xl font-black text-primary">{totalPrice.toLocaleString()}đ</span>
            </div>
          </div>
          
          <div className="flex flex-col w-full md:w-auto gap-2 md:hidden">
             <span className="text-xl font-black text-primary text-center">{totalPrice.toLocaleString()}đ</span>
          </div>

          <button className="w-full md:w-64 h-14 bg-gradient-to-r from-primary to-primary-container rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(187,184,244,0.3)] hover:shadow-[0_0_30px_rgba(187,184,244,0.5)] transition-all duration-300 active:scale-95 group">
            <span className="text-on-primary-container font-extrabold tracking-tight">Thanh toán</span>
            <span className="material-symbols-outlined text-on-primary-container group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
