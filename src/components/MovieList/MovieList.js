import styles from './MovieList.module.css';
import { Link } from 'react-router-dom';
import { getMovieDitailPage } from '../../routes';
import PropTypes from 'prop-types';

const MovieList = ({ movies, query }) => {
  const location = query ? `/movies/?query=${query}` : '/';
  return (
    <ul className={styles.movieList}>
      {movies.map(movie => {
        return (
          <li key={movie.id} className={styles.movieItem}>
            <Link
              to={getMovieDitailPage(movie.id)}
              className={styles.movieLink}
              state={{ from: location }}
            >
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
