import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListsOverview from '../../pages/lists/ListsOverview.tsx';
import ListDetail from '../../pages/lists/ListDetail.tsx';
import About from '../../pages/About.tsx';

const router = createBrowserRouter([
  {
    path: '/lists',
    children: [
      {
        path: '',
        element: <ListsOverview />,
      },
      {
        path: ':id',
        element: <ListDetail />,
      },
    ],
  },
  {
    path: '/about',
    element: <About />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
