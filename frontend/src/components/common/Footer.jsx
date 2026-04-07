import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 w-full py-12 px-8 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        <div>
          <div className="text-lg font-bold text-violet-200 mb-6">MovieT</div>
          <p className="text-gray-500 max-w-xs font-body text-sm">
            Mang cả thế giới điện ảnh đến trong tầm tay bạn. Đặt vé nhanh chóng, an toàn và tiện lợi nhất.
          </p>
          <div className="flex gap-4 mt-6">
            <button className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-violet-300 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">share</span>
            </button>
            <button className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-violet-300 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">mail</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-violet-300 font-bold mb-2">Liên kết</h4>
          <Link to="/contact" className="text-gray-500 hover:text-violet-300 transition-colors font-body text-sm">Liên hệ</Link>
          <Link to="/terms" className="text-gray-500 hover:text-violet-300 transition-colors font-body text-sm">Điều khoản</Link>
          <Link to="/privacy" className="text-gray-500 hover:text-violet-300 transition-colors font-body text-sm">Chính sách bảo mật</Link>
          <Link to="/download" className="text-gray-500 hover:text-violet-300 transition-colors font-body text-sm">Tải ứng dụng</Link>
        </div>
        <div>
          <h4 className="text-violet-300 font-bold mb-4">Đăng ký bản tin</h4>
          <div className="relative">
            <input className="w-full text-on-surface bg-surface-container border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary" placeholder="Nhập email của bạn" type="email"/>
            <button className="absolute right-2 top-2 bottom-2 bg-primary text-on-primary px-4 rounded-md text-xs font-bold">Gửi</button>
          </div>
          <p className="text-[10px] text-gray-500 mt-4 font-body">
            © 2024 MovieT Cinematic Experience. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
