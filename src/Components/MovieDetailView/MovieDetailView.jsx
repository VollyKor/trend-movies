import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MovieCard from 'components/MovieCard/MovieCard';
import MovieAdditionalInfo from 'components/MovieAdditionalInfo/MovieAdditionalInfo';
import GoBackButton from 'components/GoBackButton/GoBackButton';
import NotFoundView from 'components/NotFoundView/NotFoundView';
import DownloadView from 'components/DownloadView/DownloadView';
import EmptyView from 'components/EmptyView';

import request from 'service/apiRequest';

export default function MovieDetailView() {
  const params = useParams();
  const { slug } = params;

  const [data, setData] = useState({});
  const [status, setStatus] = useState('idle');

  const idFromSLug = slug.match(/[0-9a-zA-Z]+$/)[0];

  useEffect(() => {
    setStatus('pending');

    request
      .getFilmById(idFromSLug)
      .then(data => {
        setData(data);
        setStatus('resolved');
      })
      .catch(error => {
        setStatus('rejected');
        throw error;
      });
  }, [idFromSLug]);

  if (status === 'idle') {
    return <EmptyView />;
  }
  if (status === 'pending') {
    return <DownloadView />;
  }
  if (status === 'resolved') {
    return (
      <>
        <GoBackButton />
        <MovieCard data={data} />
        <MovieAdditionalInfo filmData={data} />
      </>
    );
  }
  if (status === 'rejected') {
    return <NotFoundView />;
  }
}
