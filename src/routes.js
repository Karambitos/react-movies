import { generatePath } from 'react-router-dom';

export const routes = {
  home: '/',
  movies: '/movies',
  movieDetail: '/movies/:id',
  movieDetailCast: '/movies/:id/cast',
  movieDetailReview: '/movies/:id/reviews',
};

export const getMovieDitailPage = id => {
  return generatePath(routes.movieDetail, { id });
};
