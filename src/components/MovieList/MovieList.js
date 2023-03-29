import styles from './MovieList.module.css';
import { Link } from 'react-router-dom';
import { getMovieDitailPage } from '../../routes';
import PropTypes from 'prop-types';
import defaultImage from '../../assets/default.jpg';

const MovieList = ({ movies, query }) => {
  const location = query ? `/movies/?query=${query}` : '/';

  return (
    <ul className={styles.movieList}>
      {movies.map(movie => {
        const posterPath = movie.poster_path
          ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
          : defaultImage;
        return (
          <li key={movie.id} className={styles.movieItem}>
            <Link
              to={getMovieDitailPage(movie.id)}
              className={styles.movieLink}
              state={{ from: location }}
            >
              <img
                className={styles.poster}
                src={posterPath}
                alt={movie.original_title}
                width="240px"
              />
              {movie.name ? movie.name : movie.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;

MovieList.propTypes = {
  query: PropTypes.string,
  movies: PropTypes.arrayOf(PropTypes.object.isRequired),
};
