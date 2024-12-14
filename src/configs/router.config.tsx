import { createBrowserRouter } from 'react-router-dom';

import AdminPage from '@/pages/admin/index.page';
import AdminLayout from '@/pages/admin/layout';
import ReportOverViewPage from '@/pages/admin/reports/overview/page';
import MyAccountPage from '@/pages/admin/settings/my-account/index.page';

import AuthLayout from '@/pages/auth/layout';
import LoginPage from '@/pages/auth/login.page';
import NotFoundPage from '@/pages/not-found.page';
import SystemAccountsPage from '@/pages/admin/system/accounts/page';
import PublishersPage from '@/pages/admin/publishers/page';
import RolePage from '@/pages/admin/system/roles/page';
import BookPage from '@/pages/admin/books/page';
import AuthorsPage from '@/pages/admin/authors/page';
import CategoriesPage from '@/pages/admin/category/page';
import BookCopyPage from '@/pages/admin/books/[id]/page';

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
      {
        path: '/system',
        children: [
          { path: 'accounts', element: <SystemAccountsPage /> },
          { path: 'roles', element: <RolePage /> },
          { path: 'authors', element: <AuthorsPage />},
          { path: 'category', element: <CategoriesPage />},
        ]
      },
      {
        path: '/publishers',
        element: <PublishersPage />
      },
      {
        path: '/authors',
        element: <AuthorsPage />,
      },
      {
        path: '/categories',
        element: <CategoriesPage />,
      },
      {
        path: '/books',
        element: <BookPage />,
      },
      {
        path: '/books/:id',
        element: <BookCopyPage />, 
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
