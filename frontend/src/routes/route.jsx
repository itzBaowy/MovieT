import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLayout from '../components/common/UserLayout';
import HomePage from '../pages/User/HomePage/HomePage';
import MovieDetailPage from '../pages/User/MovieDetail/MovieDetailPage';
import MoviesPage from '../pages/User/MoviesPage/MoviesPage';
import ProfilePage from '../pages/User/ProfilePage/ProfilePage';
import SeatsPage from '../pages/User/SeatsPage/SeatsPage';
import PaymentPage from '../pages/User/PaymentPage/PaymentPage';
import MyTicketsPage from '../pages/User/MyTicketsPage/MyTicketsPage';
import LoginPage from '../pages/Auth/LoginPage/LoginPage';
import SignupPage from '../pages/Auth/SignupPage/SignupPage';
import GuestRoute from '../components/common/GuestRoute';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { Toaster } from 'react-hot-toast';

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
        path: 'movies',
        element: <MoviesPage />,
      },
      {
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: 'profile',
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
      },
      {
        path: 'my-tickets',
        element: <ProtectedRoute><MyTicketsPage /></ProtectedRoute>,
      },
    ],
  },
  {
    path: '/booking/seats/:id',
    element: <ProtectedRoute><SeatsPage /></ProtectedRoute>,
  },
  {
    path: '/booking/payment/:id',
    element: <ProtectedRoute><PaymentPage /></ProtectedRoute>,
  },
  {
    path: '/login',
    element: <GuestRoute><LoginPage /></GuestRoute>,
  },
  {
    path: '/register',
    element: <GuestRoute><SignupPage /></GuestRoute>,
  },
]);

export default function AppRouter() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}
