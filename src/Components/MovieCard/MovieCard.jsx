import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

import customIcons from './customIcons';
import IconContainer from './iconConteiner';

import s from './MovieCard.module.css';
import empteImgURL from 'Images/imgPlaceholder.png';
import { statisticHandler } from 'redux/statistic/statistic.actions';
import { getAllRating, handleRating } from 'redux/rating/rating.actions';

const FilmView = ({ data: film }) => {
  const {
    backdrop_path,
    title = 'Unknown',
    release_date,
    vote_average,
    overview,
    genres,
    id,
  } = film;

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const filmRating = useSelector(state =>
    state.rating.moviesArr.find(film => `${id}` === film.film_id),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(statisticHandler(film));
      dispatch(getAllRating());
    }
  }, [isLoggedIn, dispatch, film]);

  function setRating(e) {
    dispatch(
      handleRating({
        rating: parseInt(e.target.value, 10),
        filmId: id,
      }),
    );
  }

  return (
    <>
      <div className={s.flex}>
        {backdrop_path ? (
          <Box>
            <img
              className={s.img}
              src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
              alt={title}
            />
          </Box>
        ) : (
          <img className={s.emptyImg} src={empteImgURL} alt={title} />
        )}

        <div className={s.desc}>
          <h2>
            {`${title}`}
            <span className={s.release_date}>({release_date.slice(0, 4)})</span>
          </h2>

          <p>
            IMBD UserScore
            <span className={s.span}>{`${vote_average}`}</span>
          </p>

          <h3 className={s.subtitle}>Genres</h3>
          <ul className={`flex-box ${s.list}`}>
            {genres.map(({ name }) => (
              <li key={name} className={s['list-item']}>
                <p className={s.genres}>{name}</p>
              </li>
            ))}
          </ul>
          <Box className={s.ratingWrapper}>
            <Box component="fieldset" p={0} mb={1} borderColor="transparent">
              <Typography component="legend">
                Average site users Rating
              </Typography>
              <Rating
                name="read-only"
                // value={Number.parseFloat(filmRating)}
                readOnly
              />
            </Box>

            {isLoggedIn ? (
              <Box component="fieldset" mb={1} borderColor="transparent">
                <Typography component="legend">Your Rating</Typography>
                {filmRating && (
                  <Rating
                    onChange={e => setRating(e)}
                    name="rating"
                    value={filmRating.rating}
                    getLabelText={value => customIcons[value].label}
                    IconContainerComponent={IconContainer}
                  />
                )}
              </Box>
            ) : (
              <Box>
                <p>Log in to set your rating</p>
              </Box>
            )}
          </Box>
        </div>
      </div>
      <Box>
        <h3 className={s.overview}>Overview</h3>
        <p className={s.descr}>{overview}</p>
      </Box>
    </>
  );
};

export default FilmView;
