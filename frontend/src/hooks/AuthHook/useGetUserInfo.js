import { useState } from 'react';
import { authService } from '../../services/AuthService';
import useAuthStore from '../../store/useAuthStore';

export default function useGetUserInfo() {
    const [isLoading, setIsLoading] = useState(false);
    const clearAuth = useAuthStore(state => state.clearAuth);
    const setAuth = useAuthStore(state => state.setAuth);

    const fetchUserInfo = async (tokenOverride) => {
        setIsLoading(true);
        try {
            const response = await authService.getProfile();
            const userData = response.data;

            localStorage.setItem("user_storage", JSON.stringify(userData));

            const token = tokenOverride || localStorage.getItem("accessToken");
            setAuth(userData, token);
            return userData;
        } catch (error) {
            clearAuth();
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { fetchUserInfo, isLoading };
}
