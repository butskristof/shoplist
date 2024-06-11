import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import AboutPage from '@/pages/AboutPage.tsx';
import ListsPage from '@/pages/lists/ListsPage.tsx';
import ListPage from '@/pages/lists/ListPage.tsx';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/lists" />}
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
      <Route
        path="/about"
        element={<AboutPage />}
      />
      <Route
        path="*"
        element={<div>Not found</div>}
      />
    </Routes>
  </Router>
);

export default AppRoutes;
