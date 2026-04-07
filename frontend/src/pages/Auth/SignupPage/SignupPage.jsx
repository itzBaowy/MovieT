import React from 'react';
import { Link } from 'react-router-dom';

export default function SignupPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <img 
          className="w-full h-full object-cover opacity-30 scale-110" 
          alt="Cinematic Background" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl7TefPqKBxEbC6-eATe2Wz9M0u-LefyQzpHdd_rfTmPrzkO3BbdgX5d0ICpb2LmN_ZkvXvImjOrLjHIjX7t5ZA9m989wF6MQia0OsC33XBIDqRav4qwzXfJl0PLEsbg-KLB_x9P_OferB830cuXHD6SubQcQGriVrwad19OeFEwkr_IWt9CcTmafAuP5PinnjZuvxeMOXoTymtcOffx2SbWVZ7cCjQaKf-DF3b5-3KUAA-xf_0N45WwQlLBGZpT0LMkjM9r_g-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface"></div>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-md px-6 py-12">
        {/* Brand Identity */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-primary text-4xl" data-icon="movie">movie</span>
            <span className="text-2xl font-black tracking-tighter text-primary">MovieT</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface text-center">Create Account</h1>
          <p className="text-on-surface-variant text-sm mt-2 text-center">Join the community and start your cinematic journey.</p>
        </div>

        {/* Signup Card */}
        <div className="glass-panel rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-outline-variant/15">
          <form className="space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="name">Full Name</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-xl" data-icon="person">person</span>
                </div>
                <input 
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all duration-300 outline-none" 
                  id="name" 
                  name="name" 
                  placeholder="John Doe" 
                  type="text"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="email">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-xl" data-icon="mail">mail</span>
                </div>
                <input 
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all duration-300 outline-none" 
                  id="email" 
                  name="email" 
                  placeholder="name@example.com" 
                  type="email"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="password">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-xl" data-icon="lock">lock</span>
                </div>
                <input 
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all duration-300 outline-none" 
                  id="password" 
                  name="password" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-primary-fixed-dim ml-1" htmlFor="confirm_password">Confirm Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-xl" data-icon="verified_user">verified_user</span>
                </div>
                <input 
                  className="block w-full pl-11 pr-4 py-3 bg-surface-container-low border-0 rounded-xl text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all duration-300 outline-none" 
                  id="confirm_password" 
                  name="confirm_password" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
            </div>

            {/* Action Button */}
            <button className="w-full mt-4 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-bold py-4 rounded-xl shadow-[0_0_15px_rgba(187,184,244,0.3)] hover:shadow-[0_0_25px_rgba(187,184,244,0.5)] hover:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2" type="submit">
              Sign Up
              <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </button>
          </form>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center w-full gap-4">
              <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
              <span className="text-outline text-xs uppercase tracking-widest">or sign up with</span>
              <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <button className="flex items-center justify-center gap-2 bg-surface-container-low border border-outline-variant/15 py-3 rounded-xl text-on-surface hover:bg-surface-container transition-colors duration-200">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-surface-container-low border border-outline-variant/15 py-3 rounded-xl text-on-surface hover:bg-surface-container transition-colors duration-200">
                <svg className="w-5 h-5" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                </svg>
                <span className="text-sm font-medium">Apple</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Link */}
        <p className="text-center mt-8 text-on-surface-variant text-sm">
          Already have an account? 
          <Link className="text-primary font-semibold hover:text-primary-container transition-colors duration-200 ml-1" to="/login">Login</Link>
        </p>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[140px] pointer-events-none"></div>
      
      <footer className="relative z-10 py-6 text-outline text-[10px] uppercase tracking-[0.2em]">
        © 2024 MovieT Entertainment. All rights reserved.
      </footer>
    </div>
  );
}
