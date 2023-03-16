import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../api/movieAPI';
import { TailSpin } from 'react-loader-spinner';
// import { v4 as uuidv4 } from 'uuid';
import styles from './Reviews.module.css';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReview] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    setStatus(true);
    const endpoint = `movie/${movieId}/reviews?`;
    getMovie(endpoint)
      .then(res => {
        setReview(res.data.results);
      })
      .catch(error => console.log(error))
      .finally(() => {
        setStatus(false);
      });
  }, [movieId]);

  return (
    <>
      {status && <TailSpin />}
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(review => {
            const { author_details, content, created_at, updated_at, url, id } =
              review;
            const options = {
              timeZone: 'UTC',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              second: 'numeric',
              hour12: false,
            };

            const createdDate = new Date(created_at).toLocaleString(
              'en-US',
              options
            );
            const updatedDate = new Date(updated_at).toLocaleString(
              'en-US',
              options
            );
            return (
              <li key={id}>
                <div className={styles.reviewCard}>
                  <div className={styles.reviewCardHeader}>
                    <div className={styles.reviewCardAuthorDetails}>
                      <h3 className={styles.reviewCardAuthorName}>
                        {author_details.name}
                      </h3>
                      <span className={styles.reviewCardAuthorUsername}>
                        {author_details.username}
                      </span>
                      <span className={styles.reviewCardRating}>
                        {author_details.rating}/10
                      </span>
                    </div>
                  </div>
                  <div className={styles.reviewCardContent}>
                    <p>{content}</p>
                  </div>
                  <div className={styles.reviewCardFooter}>
                    <span className={styles.reviewCardCreatedAt}>
                      {createdDate}
                    </span>
                    <span className={styles.reviewCardCreatedAt}>
                      {updatedDate}
                    </span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.reviewCardLink}
                    >
                      Read full review
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="container-detail">
          <h2>There are no review for this movie</h2>
        </div>
      )}
    </>
  );
}
