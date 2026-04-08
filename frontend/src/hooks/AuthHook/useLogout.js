import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export default function useLogout() {
    const clearAuth = useAuthStore(state => state.clearAuth);
    const navigate = useNavigate();

    const logout = () => {
        clearAuth();
        navigate('/login');
    };

    return { logout };
}
