import { create } from "zustand";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user_storage")) || null,
    token: localStorage.getItem("accessToken") || null,
    
    setAuth: (user, token) => set({ user, token }),
    
    clearAuth: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user_storage");
        set({ user: null, token: null });
    }
}));

export default useAuthStore;
