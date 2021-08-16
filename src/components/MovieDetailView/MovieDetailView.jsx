import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  MovieAdditionalInfo,
  GoBackButton,
  NotFoundView,
  DownloadView,
  MovieCard,
  EmptyView,
} from 'components';

import req from 'service/apiRequest';

export default function MovieDetailView() {
  const params = useParams();
  const { slug } = params;

  const [data, setData] = useState({});
  const [status, setStatus] = useState(null);

  const idFromSLug = slug.match(/[0-9a-zA-Z]+$/)[0];

  useEffect(() => {
    setStatus('pending');

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
  }, [idFromSLug]);

  switch (status) {
    case 'pending':
      return <DownloadView />;
    case 'resolved':
      return (
        <>
          <GoBackButton />
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
