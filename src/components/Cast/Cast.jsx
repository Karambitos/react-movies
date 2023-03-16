import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../api/movieAPI';
import { TailSpin } from 'react-loader-spinner';
import styles from './Cast.module.css';
import defaultImage from '../../assets/default.jpg';

export default function Cast() {
  const { movieId } = useParams();
  const [casts, setCast] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    setStatus(true);
    const endpoint = `movie/${movieId}/credits?`;
    getMovie(endpoint)
      .then(res => {
        setCast(res.data.cast);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setStatus(false);
      });
  }, [movieId]);

  return (
    <div className={styles.cast}>
      {status && <TailSpin />}
      {casts.length > 0 ? (
        <ul className={styles.listCast}>
          {casts.map(cast => {
            const posterPath = cast.profile_path
              ? `https://image.tmdb.org/t/p/w500${cast.profile_path}`
              : defaultImage;
            return (
              <li key={cast.id}>
                <img
                  className={styles.img}
                  src={posterPath}
                  alt={cast.name}
                  width="60px"
                  height="100px"
                />
                <h2 className={styles.title}>{cast.name}</h2>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="container-detail">
          <h2>There are no casts for this movie</h2>
        </div>
      )}
    </div>
  );
}
