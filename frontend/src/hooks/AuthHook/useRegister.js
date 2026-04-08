import { useState } from 'react';
import { authService } from '../../services/AuthService';
import toast from 'react-hot-toast';

export default function useRegister() {
    const [isLoading, setIsLoading] = useState(false);

    const register = async (userData) => {
        setIsLoading(true);
        try {
            await authService.register(userData);
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
            return true;
        } catch (error) {
            toast.error(error.message || 'Đăng ký thất bại. Vui lòng thử lại.');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return { register, isLoading };
}
