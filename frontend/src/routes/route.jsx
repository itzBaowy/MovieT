import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserLayout from '../components/common/UserLayout';
import HomePage from '../pages/User/HomePage/HomePage';
import MovieDetailPage from '../pages/User/MovieDetail/MovieDetailPage';
import SeatsPage from '../pages/User/SeatsPage/SeatsPage';
import PaymentPage from '../pages/User/PaymentPage/PaymentPage';
import MyTicketsPage from '../pages/User/MyTicketsPage/MyTicketsPage';
import LoginPage from '../pages/Auth/LoginPage/LoginPage';
import SignupPage from '../pages/Auth/SignupPage/SignupPage';
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
        path: 'movie/:id',
        element: <MovieDetailPage />,
      },
      {
        path: 'my-tickets',
        element: <MyTicketsPage />,
      },
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
]);

export default function AppRouter() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}
