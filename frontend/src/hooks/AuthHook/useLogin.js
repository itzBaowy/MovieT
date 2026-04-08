import { useState } from 'react';
import { authService } from '../../services/AuthService';
import useAuthStore from '../../store/useAuthStore';
import useGetUserInfo from './useGetUserInfo';
import toast from 'react-hot-toast';

export default function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const setAuth = useAuthStore(state => state.setAuth);
    const { fetchUserInfo } = useGetUserInfo();

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await authService.login(credentials);
            const { accessToken, refreshToken } = response.data;

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            const userData = await fetchUserInfo(accessToken);

            if (userData) {
                toast.success('Đăng nhập thành công!');
                return true;
            } else {
                toast.error('Không thể lấy thông tin người dùng.');
                return false;
            }
        } catch (error) {
            toast.error(error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading };
}
