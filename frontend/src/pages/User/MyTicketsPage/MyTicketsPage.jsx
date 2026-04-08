import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import TicketService from "../../../services/ticket/TicketService.js";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await TicketService.getMyTickets();
        setTickets(response?.data || []);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const mappedTickets = useMemo(() => {
    return tickets.map((ticket) => {
      const showtime = ticket.showtime || {};
      const movie = showtime.movie || {};
      const cinema = showtime.cinema || {};

      return {
        id: ticket.orderId || ticket.id,
        movieTitle: movie.title || "Movie",
        date: showtime.date || "--/--/----",
        time: showtime.time || "--:--",
        cinema: cinema.name || "Cinema",
        room: showtime.format || "Standard",
        seats: Array.isArray(ticket.seats) ? ticket.seats.join(", ") : "",
        poster: movie.image || "https://via.placeholder.com/400x600?text=Movie",
        qrCode:
          "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
          encodeURIComponent(ticket.orderId || ticket.id),
        status: ticket.status === "PAID" ? "Sẵn sàng" : ticket.status,
      };
    });
  }, [tickets]);

  return (
    <div className="bg-background min-h-screen">
      <main className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
        {/* Page Title */}
        <header className="mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold font-headline tracking-tight text-on-surface mb-2">
            Vé của tôi
          </h1>
          <p className="text-on-surface-variant text-lg">
            Quản lý các suất chiếu sắp tới và lịch sử xem phim của bạn.
          </p>
        </header>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-12">
          <button className="glass-card px-8 py-3 rounded-full border border-primary/20 text-primary font-semibold active-glow flex items-center gap-2">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              confirmation_number
            </span>
            Phim sắp xem
          </button>
          <button className="bg-surface-container/40 px-8 py-3 rounded-full text-on-surface-variant font-medium hover:text-on-surface transition-colors">
            Lịch sử
          </button>
        </div>

        {/* Ticket List */}
        {loading ? (
          <div className="text-on-surface-variant text-center py-12">
            Đang tải danh sách vé...
          </div>
        ) : null}

        {!loading && mappedTickets.length === 0 ? (
          <div className="text-on-surface-variant text-center py-12">
            Bạn chưa có vé nào.
          </div>
        ) : null}

        <div className="flex flex-col gap-6">
          {mappedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="glass-card rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border border-outline-variant/15 group hover:border-primary/30 transition-all duration-500"
            >
              {/* Movie Poster */}
              <div className="w-32 h-48 md:w-40 md:h-60 flex-shrink-0 relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105">
                <img
                  alt={ticket.movieTitle}
                  className="w-full h-full object-cover"
                  src={ticket.poster}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-40"></div>
              </div>

              {/* Ticket Details */}
              <div className="flex-grow space-y-4 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold font-headline text-on-surface leading-tight">
                  {ticket.movieTitle}
                </h2>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base">
                  <div className="flex items-center gap-2 text-on-surface-variant justify-center md:justify-start">
                    <span className="material-symbols-outlined text-primary text-xl">
                      calendar_today
                    </span>
                    {ticket.date}
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant justify-center md:justify-start">
                    <span className="material-symbols-outlined text-primary text-xl">
                      schedule
                    </span>
                    {ticket.time}
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant col-span-2 justify-center md:justify-start">
                    <span className="material-symbols-outlined text-primary text-xl">
                      location_on
                    </span>
                    {ticket.cinema}
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant justify-center md:justify-start">
                    <span className="material-symbols-outlined text-primary text-xl">
                      meeting_room
                    </span>
                    {ticket.room}
                  </div>
                  <div className="flex items-center gap-2 text-on-surface-variant justify-center md:justify-start">
                    <span className="material-symbols-outlined text-primary text-xl">
                      event_seat
                    </span>
                    Ghế: {ticket.seats}
                  </div>
                </div>
              </div>

              {/* Right Action Section */}
              <div className="flex flex-col items-center md:items-end justify-between self-stretch py-2 gap-6 md:min-w-[180px]">
                <div className="flex flex-col items-center md:items-end gap-1">
                  <div className="p-3 bg-white rounded-xl shadow-inner">
                    <img
                      alt="QR Code"
                      className="w-16 h-16 grayscale opacity-80"
                      src={ticket.qrCode}
                    />
                  </div>
                  <span className="text-xs text-on-surface-variant tracking-widest mt-2">
                    {ticket.id}
                  </span>
                </div>
                <div className="flex flex-col items-center md:items-end gap-4 w-full">
                  <div className="flex items-center gap-2 text-green-400 font-bold status-glow text-sm uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    {ticket.status}
                  </div>
                  <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 py-2 px-6 rounded-xl font-semibold backdrop-blur-md transition-all active:scale-95">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 flex justify-center">
          <Link
            to="/"
            className="cta-pulse bg-gradient-to-r from-primary to-primary-container text-on-primary-container px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Đặt vé thêm
          </Link>
        </div>
      </main>
    </div>
  );
}
