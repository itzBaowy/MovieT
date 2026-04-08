import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

export default function GuestRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  // Thêm cơ chế: Nếu đã đăng nhập, đẩy về trang chủ và không cho phép truy cập lại trang Auth
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
