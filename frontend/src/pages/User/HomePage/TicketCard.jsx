export default function TicketCard({ ticket }) {
  return (
    <div className="glass rounded-2xl overflow-hidden transition-all duration-300 hover:glow-primary">
      <div className="p-5 space-y-4">
        {/* Movie Title */}
        <h4 className="text-on-surface font-semibold font-[var(--font-heading)] text-base">
          {ticket.movieTitle}
        </h4>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-on-surface-variant block mb-0.5">Rạp chiếu</span>
            <span className="text-on-surface font-medium">{ticket.cinema}</span>
          </div>
          <div>
            <span className="text-on-surface-variant block mb-0.5">Thời gian</span>
            <span className="text-on-surface font-medium">{ticket.time}</span>
          </div>
          <div>
            <span className="text-on-surface-variant block mb-0.5">Ghế ngồi</span>
            <span className="text-on-surface font-medium">{ticket.seats}</span>
          </div>
          <div>
            <span className="text-on-surface-variant block mb-0.5">Mã đặt vé</span>
            <span className="text-primary font-mono font-medium">{ticket.code}</span>
          </div>
        </div>

        {/* QR & Status */}
        <div className="flex items-end justify-between pt-3 border-t border-outline-variant/10">
          {/* QR Placeholder */}
          <div className="w-16 h-16 rounded-lg bg-on-surface/90 p-1.5 flex items-center justify-center">
            <div className="w-full h-full bg-surface rounded-sm grid grid-cols-5 grid-rows-5 gap-px p-0.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-[1px] ${Math.random() > 0.4 ? 'bg-on-surface' : 'bg-surface'}`}
                />
              ))}
            </div>
          </div>

          {/* Status */}
          <span
            className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
              ticket.status === 'active'
                ? 'bg-green-500/15 text-green-400'
                : 'bg-surface-container-highest text-on-surface-variant'
            }`}
          >
            {ticket.status === 'active' ? '✓ Sẵn sàng' : 'Đã hoàn thành'}
          </span>
        </div>
      </div>
    </div>
  );
}
