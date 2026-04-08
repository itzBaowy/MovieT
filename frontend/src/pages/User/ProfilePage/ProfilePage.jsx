import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../../store/useAuthStore';
import { authService } from '../../../services/AuthService';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { key: 'info', label: 'Thông tin cá nhân', icon: 'account_circle' },
  { key: 'security', label: 'Bảo mật', icon: 'shield' },
  { key: 'notifications', label: 'Thông báo', icon: 'notifications' },
  { key: 'saved', label: 'Phim đã lưu', icon: 'bookmark' },
];

export default function ProfilePage() {
  const user = useAuthStore(state => state.user);
  const setAuth = useAuthStore(state => state.setAuth);
  const token = useAuthStore(state => state.token);

  const [activeTab, setActiveTab] = useState('info');
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await authService.updateProfile(form);
      const updatedUser = response.data?.metadata || response.data;
      setAuth(updatedUser, token);
      localStorage.setItem('user_storage', JSON.stringify(updatedUser));
      toast.success('Cập nhật thông tin thành công!');
    } catch {
      toast.error('Cập nhật thất bại, thử lại sau.');
    } finally {
      setSaving(false);
    }
  };

  const avatarUrl = user?.avatar
    ? user.avatar
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || user?.username || 'U')}&background=1e1c4e&color=bbb8f4&size=200&bold=true`;

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Top Banner */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 via-secondary/10 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000')] bg-cover bg-center opacity-10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-16 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-3 space-y-4">
            {/* Avatar Card */}
            <div className="bg-surface-container rounded-3xl p-6 flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-28 h-28 rounded-full object-cover border-4 border-primary/30 shadow-xl shadow-primary/20"
                />
                <button className="absolute bottom-1 right-1 w-8 h-8 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-sm">photo_camera</span>
                </button>
              </div>
              <h2 className="text-lg font-bold text-on-surface line-clamp-1">
                {user?.fullName || user?.username || 'Người dùng'}
              </h2>
              <p className="text-on-surface-variant text-sm mt-0.5">@{user?.username}</p>
              <div className="mt-3 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold flex items-center gap-1.5 border border-primary/20">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                Thành viên MovieT
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-6 w-full border-t border-outline-variant/10 pt-5">
                {[
                  { value: '0', label: 'Vé đã mua' },
                  { value: '0', label: 'Phim xem' },
                  { value: '0', label: 'Đã lưu' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-xl font-extrabold text-on-surface">{stat.value}</p>
                    <p className="text-[10px] text-on-surface-variant leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="bg-surface-container rounded-3xl p-3 space-y-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === item.key
                      ? 'bg-primary/15 text-primary'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                  {item.label}
                  {activeTab === item.key && (
                    <span className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </nav>
          </aside>

          {/* MAIN CONTENT */}
          <section className="lg:col-span-9 space-y-6">
            {activeTab === 'info' && (
              <>
                {/* Personal Info Form */}
                <div className="bg-surface-container rounded-3xl p-8">
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold font-headline text-on-surface">Thông tin cá nhân</h1>
                    <p className="text-on-surface-variant text-sm mt-1">Quản lý thông tin hồ sơ và cài đặt tài khoản của bạn.</p>
                  </div>

                  <form onSubmit={handleSave} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Họ và tên</label>
                        <input
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="Nhập họ và tên..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tên đăng nhập</label>
                        <input
                          name="username"
                          value={user?.username || ''}
                          disabled
                          className="w-full bg-surface-container-low/50 rounded-xl px-4 py-3 text-on-surface-variant text-sm border-none cursor-not-allowed"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95 disabled:opacity-60"
                      >
                        {saving ? (
                          <>
                            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                            Đang lưu...
                          </>
                        ) : (
                          <>
                            <span className="material-symbols-outlined text-sm">save</span>
                            Lưu thay đổi
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Linked Accounts */}
                <div className="bg-surface-container rounded-3xl p-8">
                  <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-tertiary rounded-full" />
                    Tài khoản liên kết
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-3 bg-surface-container-low hover:bg-surface-container-high px-5 py-3 rounded-xl text-sm font-semibold transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                      Kết nối với Google
                    </button>
                    <button className="flex items-center gap-3 bg-surface-container-low hover:bg-surface-container-high px-5 py-3 rounded-xl text-sm font-semibold transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                      Kết nối với Facebook
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeTab !== 'info' && (
              <div className="bg-surface-container rounded-3xl p-16 text-center">
                <span className="material-symbols-outlined text-6xl text-on-surface-variant/40 mb-4 block">
                  {NAV_ITEMS.find(n => n.key === activeTab)?.icon}
                </span>
                <h2 className="text-xl font-bold text-on-surface-variant">
                  {NAV_ITEMS.find(n => n.key === activeTab)?.label}
                </h2>
                <p className="text-sm text-on-surface-variant mt-2">Tính năng đang được phát triển...</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
