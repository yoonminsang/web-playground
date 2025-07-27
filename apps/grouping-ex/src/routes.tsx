import { createBrowserRouter } from 'react-router';

import { ProjectUrl } from './constants/url';
import { RootLayout } from './pages/Layout';
import { RootRoute } from './pages/Page';
import { TodoPage } from './pages/todo/Page';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: ProjectUrl.toString(),
        element: <RootRoute />,
      },
      {
        path: ProjectUrl['todo'].toString(),
        element: <TodoPage />,
      },
    ],
  },
]);
