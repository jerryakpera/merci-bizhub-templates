import { createBrowserRouter } from 'react-router-dom';

import * as pages from './pages';
import { Layout } from './components/layout';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <pages.HomePage />,
      },
    ],
  },
]);
