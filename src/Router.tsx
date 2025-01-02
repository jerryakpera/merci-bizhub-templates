import { createBrowserRouter } from 'react-router-dom';

import * as pages from './pages';
import { GuestLayout, ProtectedLayout } from './components/layout';

import GuestRoute from './components/authentication/GuestRoute';
import ProtectedRoute from '@/components/authentication/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/landing',
    element: (
      <GuestRoute>
        <GuestLayout />
      </GuestRoute>
    ),
    children: [
      {
        index: true,
        element: <pages.HomePage />,
      },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <pages.Dashboard />,
      },
      {
        path: 'wrong-transfer',
        element: <pages.WrongTransfer />,
      },
      {
        path: 'affidavit',
        element: <pages.Affidavit />,
      },
    ],
  },
]);
