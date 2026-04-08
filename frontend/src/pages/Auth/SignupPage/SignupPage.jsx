import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useRegister from '../../../hooks/AuthHook/useRegister';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { register, isLoading } = useRegister();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, username, email, password, confirmPassword } = formData;

    if (!fullName || !username || !email || !password || !confirmPassword) {
      return toast.error('Vui lòng nhập đầy đủ thông tin');
    }

    if (password !== confirmPassword) {
      return toast.error('Mật khẩu không khớp');
    }

    const success = await register({ fullName, username, email, password });
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="fixed inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-30 scale-110" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl7TefPqKBxEbC6-eATe2Wz9M0u-LefyQzpHdd_rfTmPrzkO3BbdgX5d0ICpb2LmN_ZkvXvImjOrLjHIjX7t5ZA9m989wF6MQia0OsC33XBIDqRav4qwzXfJl0PLEsbg-KLB_x9P_OferB830cuXHD6SubQcQGriVrwad19OeFEwkr_IWt9CcTmafAuP5PinnjZuvxeMOXoTymtcOffx2SbWVZ7cCjQaKf-DF3b5-3KUAA-xf_0N45WwQlLBGZpT0LMkjM9r_g-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
      </div>

      <main className="relative z-10 w-full max-w-md px-6 py-12">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-4xl">movie</span>
            <span className="text-2xl font-black tracking-tighter text-primary">MovieT</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Create Account</h1>
        </div>

        <div className="glass-panel rounded-3xl p-8 border border-outline-variant/15">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="fullName">Full Name</label>
              <input 
                className="block w-full px-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface focus:ring-1 focus:ring-primary/40 outline-none" 
                id="fullName" 
                placeholder="John Doe" 
                type="text"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="username">Username</label>
              <input 
                className="block w-full px-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface focus:ring-1 focus:ring-primary/40 outline-none" 
                id="username" 
                placeholder="johndoe" 
                type="text"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="email">Email Address</label>
              <input 
                className="block w-full px-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface focus:ring-1 focus:ring-primary/40 outline-none" 
                id="email" 
                placeholder="name@example.com" 
                type="email"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="password">Password</label>
              <input 
                className="block w-full px-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface focus:ring-1 focus:ring-primary/40 outline-none" 
                id="password" 
                placeholder="••••••••" 
                type="password"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="confirmPassword">Confirm Password</label>
              <input 
                className="block w-full px-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface focus:ring-1 focus:ring-primary/40 outline-none" 
                id="confirmPassword" 
                placeholder="••••••••" 
                type="password"
                onChange={handleChange}
              />
            </div>

            <button 
              className="w-full mt-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-bold py-4 rounded-xl shadow-lg hover:scale-[0.98] transition-all disabled:opacity-50" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-on-surface-variant text-sm">
          Already have an account? 
          <Link className="text-primary font-semibold hover:text-primary-container transition-all ml-1" to="/login">Login</Link>
        </p>
      </main>
    </div>
  );
}
