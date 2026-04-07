import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock booking data
  const booking = {
    movieTitle: "Hành Tinh Cát: Phần Hai",
    date: "24/05/2024",
    time: "20:15",
    cinema: "CGV Vincom Center - P7",
    seats: "H12, H13",
    price: "240.000 VND",
    poster: "https://lh3.googleusercontent.com/aida-public/AB6AXuBY1op6iR0rdq5ATJ0UAs47Nxt-0GESt33vvggI1BpkHeU0c0dDF5zMizarSbA7A_L-upyde78kWp9ceIrxVS30UyjR-RS1_H0krMWec4REzWHFZBLmUutJY2UCvYY0WLtoZihQynhE5DUPh2TgaDXLCBCQU8yXQ8QKq4k6YvQwHOjBypUUtiZzDCWfJLtlH-DEGrsPZhoRtlrgmLwPoSgCLc-GFECuEJsp9PFBeavt13-Dt42aIx9Rkn6I_c-KRSbn-UTxH5SaP0w",
    qrCode: "https://lh3.googleusercontent.com/aida-public/AB6AXuDP-L_hM8eE0w3aBrN9HKDN-F33nzaGWeAP2f8GhUTT0belJNLBD0hiTSMGXYSc_ewcBY2EGOZiMcyXIk7mbSVrQQXSliUPc_reUPN7UgQ8raooRCbDhnNgClXo1zP-Fp9HvS0RZOmdZ1WzOFXXL-VLABBDZjX4k_KExdZbg9p7nf7QqkXjXDOdU39-NdNzsghDL_7uZBsdl0MAyOammfQhDO5wbA4QdUuszkilP_smbWJwwr_Dzjdo9wUu6hHi30tjxyPYb-SJz-E"
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen relative overflow-x-hidden">
      {/* Background Ambient Scene */}
      <div className="fixed inset-0 -z-10 bg-surface">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #201E50 0%, transparent 70%)' }}></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-16 bg-[#0e0d16]/60 backdrop-blur-[20px] shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-[#f3effc]/10 transition-all duration-300 ease-in-out active:scale-95 text-[#bbb8f4]"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="text-xl font-bold text-[#f3effc] tracking-tighter font-headline">MovieT</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-[#f3effc]/10 transition-all duration-300 ease-in-out active:scale-95 text-[#bbb8f4]">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 rounded-full hover:bg-[#f3effc]/10 transition-all duration-300 ease-in-out active:scale-95 text-[#bbb8f4]">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </header>

      <main className="relative pt-24 pb-32 px-6 flex flex-col items-center justify-center max-w-2xl mx-auto">
        {/* Success Message Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <span className="material-symbols-outlined text-green-400 text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Thanh toán thành công</h1>
          <p className="text-on-surface-variant mt-2 text-sm">Giao dịch của bạn đã được xác nhận. Chúc bạn xem phim vui vẻ!</p>
        </div>

        {/* E-Ticket Component */}
        <div className="w-full relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative glass-card rounded-[2rem] overflow-hidden shadow-2xl cinema-gradient">
            {/* Ticket Header (Poster Area) */}
            <div className="relative h-48 w-full overflow-hidden">
              <img 
                alt="Movie Poster" 
                className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
                src={booking.poster}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1823] to-transparent"></div>
              <div className="absolute bottom-6 left-8 right-8">
                <span className="text-tertiary text-xs font-bold tracking-[0.2em] uppercase mb-2 block">NOW SHOWING</span>
                <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface leading-tight">{booking.movieTitle}</h2>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="px-8 pt-4 pb-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">DATE</span>
                  <p className="font-bold text-primary">{booking.date}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">TIME</span>
                  <p className="font-bold text-primary">{booking.time}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">CINEMA</span>
                  <p className="font-bold text-on-surface">{booking.cinema}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">SEATS</span>
                  <p className="font-bold text-secondary">{booking.seats}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">PRICE</span>
                  <p className="font-bold text-on-surface">{booking.price}</p>
                </div>
              </div>

              {/* Perforation Line */}
              <div className="relative h-px w-full my-4">
                <div className="absolute inset-0 border-t border-dashed border-outline-variant/30"></div>
                <div className="absolute -left-[45px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface shadow-inner"></div>
                <div className="absolute -right-[45px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface shadow-inner"></div>
              </div>

              {/* QR Code Section */}
              <div className="flex flex-col items-center justify-center pt-2">
                <div className="relative p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md group-hover:border-primary/40 transition-colors">
                  <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-full opacity-50"></div>
                  <div className="relative w-40 h-40 bg-white rounded-lg p-2 flex items-center justify-center">
                    <img alt="QR Code" className="w-full h-full" src={booking.qrCode} />
                  </div>
                </div>
                <p className="mt-4 text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-medium">Scan at entrance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-2 py-4 px-8 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold rounded-xl shadow-[0_0_20px_rgba(187,184,244,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300">
            <span className="material-symbols-outlined">download</span>
            Tải vé
          </button>
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 py-4 px-8 bg-surface-variant/60 backdrop-blur-md border border-outline-variant/20 text-on-surface font-bold rounded-xl hover:bg-surface-variant/80 active:scale-95 transition-all duration-300"
          >
            <span className="material-symbols-outlined">home</span>
            Về trang chủ
          </Link>
        </div>
      </main>
    </div>
  );
}
