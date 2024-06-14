import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from '@/pages/AboutPage.tsx';
import ListsPage from '@/pages/lists/ListsPage.tsx';
import ListPage from '@/pages/lists/ListPage.tsx';
import AppLayout from '@/components/app/layout/AppLayout.tsx';
import NotFoundPage from '@/pages/NotFoundPage.tsx';
import UserDebugPage from '@/pages/debug/UserDebugPage.tsx';

const AppRouterProvider = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<AppLayout />}
      >
        <Route
          index
          element={
            <Navigate
              replace
              to="/lists"
            />
          }
        />
        <Route path="/lists">
          <Route
            index
            element={<ListsPage />}
          />
          <Route
            path=":id"
            element={<ListPage />}
          />
        </Route>
        <Route path="/debug">
          <Route
            path="user"
            element={<UserDebugPage />}
          />
        </Route>
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  </Router>
);

export default AppRouterProvider;
