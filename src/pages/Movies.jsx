import React from 'react';
import MovieList from '../components/MovieList/MovieList';
import { getMovie } from '../api/movieAPI';
import { useState, useEffect } from 'react';
import SVGComponent from '../assets/SearchIcon';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchParams.get('query')) {
      const query = searchParams.get('query');
      const endpoint = `search/movie?query=${query}&`;
      getMovie(endpoint)
        .then(res => {
          setMovies(res.data.results);
        })
        .catch(error => console.log(error))
        .finally(() => {});
    }
  }, [searchParams]);

  const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.search.value;
    setSearchParams(query !== '' ? { query: query } : {});
    const endpoint = `search/movie?query=${query}&`;
    getMovie(endpoint)
      .then(res => {
        setMovies(res.data.results);
      })
      .catch(error => console.log(error))
      .finally(() => {
        // console.log(query);
      });
  };

  return (
    <>
      <form className="searchForm" onSubmit={handleSubmit}>
        <button type="submit">
          <span>Search</span>
          <SVGComponent />
        </button>
        <input
          name="search"
          type="text"
          required
          autoFocus
          placeholder="Search movies"
        />
      </form>
      {movies.length > 0 && (
        <>
          <h1>Trending today</h1>
          <MovieList movies={movies} query={searchParams.get('query')} />
        </>
      )}
    </>
  );
};

export default Movies;
