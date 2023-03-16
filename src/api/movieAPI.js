import axios from 'axios';

const KEY = '50f261687102a95a67f91702d532667e';

export const getMovie = endpoint => {
  return axios.get(`https://api.themoviedb.org/3/${endpoint}api_key=${KEY}`);
};
