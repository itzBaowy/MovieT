import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      toast.error('Vui lòng đăng nhập để tiếp tục tính năng này.');
    }
  }, [user]);

  // Nếu người dùng chưa đăng nhập, chuyển hướng về trang login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
