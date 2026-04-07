import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLayout from '../components/common/UserLayout';
import HomePage from '../pages/User/HomePage/HomePage';
import LoginPage from '../pages/Auth/LoginPage/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      // Thêm các routes khác của User ở đây (như /movies, /seats, /payment)
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Thêm các routes cho Admin ở đây (bọc trong AdminLayout)
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
