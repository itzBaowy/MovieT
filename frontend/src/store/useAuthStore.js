import { create } from "zustand";
import { authService } from "../services/auth.service";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem("user_storage")) || null,
    token: localStorage.getItem("accessToken") || null,
    isLoggingIn: false,

    // Đăng nhập
    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const response = await authService.login(credentials);
            const { accessToken, refreshToken } = response.data;
            
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            
            set({ token: accessToken, isLoggingIn: false });
            
            // Gọi checkAuth ngay lập tức để lấy thông tin user
            const self = useAuthStore.getState();
            await self.checkAuth();
            
            return response;
        } catch (error) {
            set({ isLoggingIn: false });
            throw error;
        }
    },
    
    // Đăng ký
    register: async (userData) => {
        return await authService.register(userData);
    },
    
    // Đăng xuất
    logout: () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user_storage");
        set({ user: null, token: null });
    },
    
    // Lấy thông tin cá nhân (nếu đã có token)
    checkAuth: async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;
        
        try {
            const response = await authService.getProfile();
            const userData = response.data;
            localStorage.setItem("user_storage", JSON.stringify(userData));
            set({ user: userData, token });
        } catch (error) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user_storage");
            set({ user: null, token: null });
        }
    }
}));

export default useAuthStore;
