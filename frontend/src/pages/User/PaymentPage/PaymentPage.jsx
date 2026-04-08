import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import PaymentService from "../../../services/payment/PaymentService.js";

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isPaying, setIsPaying] = useState(false);

  const booking = useMemo(() => {
    const state = location.state || {};
    const showtime = state.showtime || {};
    const movie = showtime.movie || {};
    const cinema = showtime.cinema || {};
    const selectedSeats = state.selectedSeats || [];
    const totalPrice = Number(state.totalPrice || 0);

    return {
      movieTitle: movie.title || "Booking",
      date: showtime.date || "--/--/----",
      time: showtime.time || "--:--",
      cinema: cinema.name || "Cinema",
      selectedSeats,
      seats: selectedSeats.length > 0 ? selectedSeats.join(", ") : "Chưa chọn",
      amount: totalPrice,
      poster: movie.image || "https://via.placeholder.com/400x600?text=Movie",
      showtimeId: id,
    };
  }, [id, location.state]);

  const canPay = booking.amount > 0;

  const handlePayWithMomo = async () => {
    if (!canPay) {
      toast.error("Vui lòng chọn ghế trước khi thanh toán");
      navigate(`/booking/seats/${id}`);
      return;
    }

    try {
      setIsPaying(true);
      const payload = {
        amount: booking.amount,
        orderInfo: `Thanh toan ve phim ${booking.movieTitle}`,
        extraData: JSON.stringify({
          showtimeId: booking.showtimeId,
          seats: booking.selectedSeats,
        }),
      };

      const response = await PaymentService.createMomoPayment(payload);
      const paymentUrl = response?.data?.paymentUrl;
      const orderId = response?.data?.orderId;

      if (!paymentUrl) {
        throw new Error("Không nhận được link thanh toán từ MoMo");
      }

      localStorage.setItem(
        "pending_booking",
        JSON.stringify({
          showtimeId: booking.showtimeId,
          seats: booking.selectedSeats,
          amount: booking.amount,
          orderId,
          paymentType: "MOMO",
        }),
      );

      window.location.href = paymentUrl;
    } catch (error) {
      toast.error(error?.message || "Không thể tạo thanh toán MoMo");
      setIsPaying(false);
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen relative overflow-x-hidden">
      {/* Background Ambient Scene */}
      <div className="fixed inset-0 -z-10 bg-surface">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary-container/20 rounded-full blur-[100px]"></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #201E50 0%, transparent 70%)",
          }}
        ></div>
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
          <span className="text-xl font-bold text-[#f3effc] tracking-tighter font-headline">
            MovieT
          </span>
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
        {/* Payment Message Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(187,184,244,0.3)]">
            <span
              className="material-symbols-outlined text-primary text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              payments
            </span>
          </div>
          <h1 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">
            Xác nhận thanh toán
          </h1>
          <p className="text-on-surface-variant mt-2 text-sm">
            Kiểm tra thông tin vé và bấm thanh toán bằng MoMo để hoàn tất giao
            dịch.
          </p>
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
                <span className="text-tertiary text-xs font-bold tracking-[0.2em] uppercase mb-2 block">
                  NOW SHOWING
                </span>
                <h2 className="font-headline text-3xl font-extrabold tracking-tighter text-on-surface leading-tight">
                  {booking.movieTitle}
                </h2>
              </div>
            </div>

            {/* Ticket Body */}
            <div className="px-8 pt-4 pb-8 space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">
                    DATE
                  </span>
                  <p className="font-bold text-primary">{booking.date}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">
                    TIME
                  </span>
                  <p className="font-bold text-primary">{booking.time}</p>
                </div>
                <div className="space-y-1 col-span-2">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">
                    CINEMA
                  </span>
                  <p className="font-bold text-on-surface">{booking.cinema}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">
                    SEATS
                  </span>
                  <p className="font-bold text-secondary">{booking.seats}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-on-surface-variant text-[10px] uppercase tracking-widest font-semibold">
                    PRICE
                  </span>
                  <p className="font-bold text-on-surface">
                    {booking.amount.toLocaleString()} VND
                  </p>
                </div>
              </div>

              {/* Perforation Line */}
              <div className="relative h-px w-full my-4">
                <div className="absolute inset-0 border-t border-dashed border-outline-variant/30"></div>
                <div className="absolute -left-[45px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface shadow-inner"></div>
                <div className="absolute -right-[45px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-surface shadow-inner"></div>
              </div>

              {/* Payment Section */}
              <div className="flex flex-col items-center justify-center pt-2">
                <button
                  onClick={handlePayWithMomo}
                  disabled={!canPay || isPaying}
                  className="w-full max-w-sm flex items-center justify-center gap-2 py-4 px-8 bg-gradient-to-r from-primary to-primary-container text-on-primary-container font-bold rounded-xl shadow-[0_0_20px_rgba(187,184,244,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined">
                    account_balance_wallet
                  </span>
                  {isPaying ? "Đang tạo giao dịch..." : "Thanh toán MoMo"}
                </button>
                <p className="mt-4 text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-medium">
                  Secure payment gateway
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-12 grid grid-cols-1 gap-4">
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
