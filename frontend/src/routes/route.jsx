import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLayout from '../components/common/UserLayout';
import HomePage from '../pages/User/HomePage/HomePage';
import MovieDetailPage from '../pages/User/MovieDetail/MovieDetailPage';
import SeatsPage from '../pages/User/SeatsPage/SeatsPage';
import PaymentPage from '../pages/User/PaymentPage/PaymentPage';
import MyTicketsPage from '../pages/User/MyTicketsPage/MyTicketsPage';
import LoginPage from '../pages/Auth/LoginPage/LoginPage';
import SignupPage from '../pages/Auth/SignupPage/SignupPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: 'my-tickets',
        element: <MyTicketsPage />,
      },
      // Thêm các routes khác của User ở đây (như /movies, /seats, /payment)
    ],
  },
  {
    path: '/booking/seats/:id',
    element: <SeatsPage />,
  },
  {
    path: '/booking/payment/:id',
    element: <PaymentPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <SignupPage />,
  },
  // Thêm các routes cho Admin ở đây (bọc trong AdminLayout)
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
