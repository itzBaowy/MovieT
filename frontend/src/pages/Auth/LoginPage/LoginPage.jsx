import React from 'react';

export default function LoginPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Cinema Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface-container-low/80 to-transparent"></div>
        <img 
          alt="Cinema Interior" 
          className="w-full h-full object-cover opacity-30 grayscale-[0.5]" 
          data-alt="Wide shot of a dark empty modern cinema theater with rows of purple seats and a glowing blue projection light beam" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKMKE_jFWO6LVQQwfnG-lWYq01MFxsVNqz5EwfruTxENXvycQuWkiZDd0J8zRJIwgWSnUXu0g3DSwfp6OBARBF16wkDJJhfeho9fZRjulsOb2B-6ScmlbyIj_vxTAEe0qt3XfnHT3P_VgqEZze6xPkh8rNlxvA1Jp__N7gPPLn0LfsaYm-h8GQRuZUcnLJ5RmCL8NZMmM6HDi9nvoV_sG7rueXXFbnJbzGyXAwLb-6zWtv6BaCpTFsHNT0z0DturZ_TimFn5K2CX8"
        />
      </div>

      {/* Login Shell */}
      <main className="relative z-10 w-full max-w-md px-6">
        {/* Header / Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-4xl" data-icon="movie">movie</span>
            <h1 className="text-3xl font-black tracking-tighter text-indigo-200 font-headline">MovieT</h1>
          </div>
          <p className="text-on-surface-variant text-sm tracking-wide">Enter the projection room</p>
        </div>

        {/* Glassmorphism Card */}
        <div className="glass-card rounded-[2rem] p-8 md:p-10 border border-outline-variant/15">
          <h2 className="text-2xl font-bold font-headline mb-8 text-on-surface">Login</h2>
          <form className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl transition-colors group-focus-within:text-primary" data-icon="alternate_email">alternate_email</span>
                <input className="w-full bg-surface-container-low border-0 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all outline-none" placeholder="name@email.com" type="email" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant ml-1">Password</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl transition-colors group-focus-within:text-primary" data-icon="lock">lock</span>
                <input className="w-full bg-surface-container-low border-0 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline/50 focus:ring-1 focus:ring-primary/40 focus:bg-surface-bright transition-all outline-none" placeholder="••••••••" type="password" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface" type="button">
                  <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input className="peer appearance-none w-5 h-5 rounded-md border border-outline-variant/30 bg-surface-container-low checked:bg-secondary checked:border-secondary transition-all" type="checkbox" />
                  <span className="material-symbols-outlined absolute text-[16px] text-on-secondary opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" data-icon="check" data-weight="fill" style={{fontVariationSettings: "'FILL' 1"}}>check</span>
                </div>
                <span className="text-on-surface-variant group-hover:text-on-surface transition-colors">Remember Me</span>
              </label>
              <a className="text-primary-fixed-dim hover:text-primary transition-colors font-medium" href="#">Forgot Password?</a>
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-2">
              <button className="gradient-btn w-full py-4 rounded-xl text-on-primary-container font-bold text-lg shadow-[0_0_15px_rgba(187,184,244,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all glow-hover" type="submit">
                Login
              </button>
              
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-outline-variant/10"></div>
                <span className="flex-shrink mx-4 text-xs font-semibold text-outline uppercase tracking-tighter">or continue with</span>
                <div className="flex-grow border-t border-outline-variant/10"></div>
              </div>

              <button className="w-full bg-surface-variant/40 hover:bg-surface-variant/60 border border-outline-variant/15 py-4 rounded-xl text-on-surface font-semibold flex items-center justify-center gap-3 transition-all active:scale-[0.98]" type="button">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Sign in with Google
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-8 text-on-surface-variant text-sm">
          Don't have an account? 
          <a className="text-secondary hover:text-secondary-fixed transition-colors font-semibold ml-1" href="#">Join the Premiere</a>
        </p>
      </main>

      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-tertiary/10 blur-[120px] rounded-full pointer-events-none"></div>
    </div>
  );
}
