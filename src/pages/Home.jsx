import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import MovieList from 'components/MovieList/MovieList';
import PropTypes from 'prop-types';

const Home = ({ status, movies }) => {
  return (
    <>
      {status && <TailSpin />}
      <h1>Trending today</h1>
      <MovieList movies={movies} />
    </>
  );
};

export default Home;

Home.propTypes = {
  status: PropTypes.bool.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object.isRequired),
};
