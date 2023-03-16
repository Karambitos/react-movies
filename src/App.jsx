import { Routes, Route } from 'react-router-dom';
import { getMovie } from './api/movieAPI';
import { useState, useEffect, lazy } from 'react';
import Home from './pages/Home';
import Movies from './pages/Movies';
import NotFound from './pages/NotFound';
import Layout from './components/Layout/Layout';
import Cast from './components/Cast/Cast';
import Reviews from './components/Reviews/Reviews';

const MovieDetails = lazy(() =>
  import('./components/MovieDetails/MovieDetails')
);

export const App = () => {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(true);
    const endpoint = 'trending/all/day?';
    getMovie(endpoint)
      .then(res => {
        setMovies(res.data.results);
        setStatus(true);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setStatus(false);
      });
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home movies={movies} status={status} />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
