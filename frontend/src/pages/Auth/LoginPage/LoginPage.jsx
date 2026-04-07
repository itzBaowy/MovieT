import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../../store/useAuthStore';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      return toast.error('Please fill in all fields');
    }

    try {
      await login({ username, password });
      toast.success('Welcome back to MovieT!');
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Cinema Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface-container-low/80 to-transparent"></div>
        <img 
          alt="Cinema Interior" 
          className="w-full h-full object-cover opacity-30 grayscale-[0.5]" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKMKE_jFWO6LVQQwfnG-lWYq01MFxsVNqz5EwfruTxENXvycQuWkiZDd0J8zRJIwgWSnUXu0g3DSwfp6OBARBF16wkDJJhfeho9fZRjulsOb2B-6ScmlbyIj_vxTAEe0qt3XfnHT3P_VgqEZze6xPkh8rNlxvA1Jp__N7gPPLn0LfsaYm-h8GQRuZUcnLJ5RmCL8NZMmM6HDi9nvoV_sG7rueXXFbnJbzGyXAwLb-6zWtv6BaCpTFsHNT0z0DturZ_TimFn5K2CX8"
        />
      </div>

      {/* Login Shell */}
      <main className="relative z-10 w-full max-w-md px-6">
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-4xl">movie</span>
            <h1 className="text-3xl font-black tracking-tighter text-indigo-200">MovieT</h1>
          </div>
          <p className="text-on-surface-variant text-sm tracking-wide">Enter the projection room</p>
        </div>

        <div className="glass-card rounded-[2rem] p-8 md:p-10 border border-outline-variant/15">
          <h2 className="text-2xl font-bold mb-8 text-on-surface">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Username</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl transition-colors group-focus-within:text-primary">person</span>
                <input 
                  className="w-full bg-surface-container-low border-0 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-primary/40 outline-none" 
                  placeholder="admin" 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl">lock</span>
                <input 
                  className="w-full bg-surface-container-low border-0 rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-1 focus:ring-primary/40 outline-none" 
                  placeholder="••••••••" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <button 
                className="gradient-btn w-full py-4 rounded-xl text-on-primary-container font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50" 
                type="submit"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
        </div>

        <p className="text-center mt-8 text-on-surface-variant text-sm">
          Don't have an account? 
          <Link className="text-secondary hover:text-secondary-fixed transition-colors font-semibold ml-1" to="/register">Join the Premiere</Link>
        </p>
      </main>
    </div>
  );
}
