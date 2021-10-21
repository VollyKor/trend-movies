import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';

import AddToFavBtn from '../AddToFavBtn';
import {
  MovieAdditionalInfo,
  GoBackButton,
  NotFoundView,
  DownloadView,
  MovieCard,
  EmptyView,
} from 'components';

import req from 'service/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { getFavMoviesList } from 'redux/favoriteMovies/favoriteMovies.actions';
import RemoveFavMovieBtn from 'components/RemoveFavBtn';

export default function MovieDetailView() {
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const [status, setStatus] = useState(null);
  const { slug } = useParams();

  const favMoviesList = useSelector(state => state.favMovies.list);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isFavorite = useSelector(state =>
    state.favMovies.favMovies.some(({ id }) => data.id === id),
  );

  const idFromSLug = slug.match(/[0-9a-zA-Z]+$/)[0];
  useEffect(() => {
    setStatus('pending');
    isLoggedIn && favMoviesList && dispatch(getFavMoviesList());

    req
      .getFilmById(idFromSLug)
      .then(data => {
        setData(data);
        setStatus('resolved');
      })
      .catch(err => {
        console.error(err);
        setStatus('rejected');
      });
  }, [dispatch, favMoviesList, idFromSLug, isLoggedIn]);

  switch (status) {
    case 'pending':
      return <DownloadView />;
    case 'resolved':
      return (
        <>
          <Box padding={1}>
            <GoBackButton />
            {isLoggedIn &&
              (isFavorite ? (
                <RemoveFavMovieBtn movie={data} />
              ) : (
                <AddToFavBtn movie={data} />
              ))}
          </Box>
          <MovieCard data={data} />
          <MovieAdditionalInfo filmData={data} />
        </>
      );
    case 'rejected':
      return <NotFoundView />;
    default:
      return <EmptyView />;
  }
}
