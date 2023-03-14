import { Routes, Route, NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import NotFound from './pages/NotFound';

export const App = () => {
  return (
    <div className="App">
      <header className="header">
        <nav>
          <NavLink className="nav-link" to="/" end>
            {' '}
            Home
          </NavLink>
          <NavLink className="nav-link" to="/movies">
            {' '}
            Movies{' '}
          </NavLink>
        </nav>
      </header>
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
};
