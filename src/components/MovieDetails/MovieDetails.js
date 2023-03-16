import styles from './MovieDetails.module.css';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { getMovie } from '../../api/movieAPI';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import defaultImage from '../../assets/default.jpg';

const MovieDetails = () => {
  const location = useLocation();
  const refLocation = location.state?.from ? location.state.from : '/';
  const { movieId } = useParams();
  const [movie, setMovie] = useState([]);

  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : defaultImage;

  useEffect(() => {
    const endpoint = `movie/${movieId}?`;
    getMovie(endpoint)
      .then(res => {
        setMovie(res.data);
      })
      .catch(error => console.log(error))
      .finally(() => {});
  }, [movieId]);

  return (
    <>
      <Link to={refLocation} className="button-main">
        Go back
      </Link>
      <div className={styles.mainWrapper}>
        <div className={styles.posterWrapper}>
          <img
            className={styles.poster}
            src={posterPath}
            alt={movie.original_title}
            width="240px"
          />
        </div>
        <div className={styles.infoWrapper}>
          <h2 className={styles.title}>{movie.original_title}</h2>
          {movie.overview && (
            <div className={styles.description}>
              <span className={styles.label}>Overview</span>
              <p className={styles.overview}>{movie.overview}</p>
            </div>
          )}
          {movie.genres && (
            <div className={styles.genres}>
              <span className={styles.label}>Genres</span>
              <ul className={styles.list}>
                {movie.genres.map(genre => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <NavLink
          className="button-main"
          to="cast"
          state={{ ...location.state }}
        >
          Cast
        </NavLink>
        <NavLink
          className="button-main"
          to="reviews"
          state={{ ...location.state }}
        >
          Review
        </NavLink>
      </div>
      <Outlet />
    </>
  );
};

export default MovieDetails;
