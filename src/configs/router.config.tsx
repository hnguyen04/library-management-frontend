import { createBrowserRouter } from 'react-router-dom';

import AdminPage from '@/pages/admin/index.page';
import AdminLayout from '@/pages/admin/layout';
import ReportOverViewPage from '@/pages/admin/reports/overview/page';
import MyAccountPage from '@/pages/admin/settings/my-account/index.page';

import AuthLayout from '@/pages/auth/layout';
import LoginPage from '@/pages/auth/login.page';
import NotFoundPage from '@/pages/not-found.page';

export const router = createBrowserRouter([
  {
    path: '',
    element: <AdminLayout />,
    children: [
      { path: '/', element: <AdminPage /> },
      {
        path: '/settings',
        children: [
          { path: 'my-account', element: <MyAccountPage /> },
        ],
      },
      {
        path: '/reports',
        children: [
          { path: 'overview', element: <ReportOverViewPage /> },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [{ path: 'login', element: <LoginPage /> }],
  },
  { path: '/404', element: <NotFoundPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
