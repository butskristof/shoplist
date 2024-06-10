import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import About from '../../pages/About.tsx';
import ListsOverview from '../../pages/lists/ListsOverview.tsx';
import ListDetail from '../../pages/lists/ListDetail.tsx';

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
          element={<ListsOverview />}
        />
        <Route
          path=":id"
          element={<ListDetail />}
        />
      </Route>
      <Route
        path="/about"
        element={<About />}
      />
      <Route
        path="*"
        element={<div>Not found</div>}
      />
    </Routes>
  </Router>
);

export default AppRoutes;
