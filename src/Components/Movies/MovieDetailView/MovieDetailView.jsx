import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import request from '../../../service/apiRequest';
import MovieCard from '../MovieCard/MovieCard';
import MovieAdditionalInfo from '../MovieAdditionalInfo/MovieAdditionalInfo';
import GoBackButton from '../GoBackButton/GoBackButton';
import NotFoundView from '../../NotFoundView/NotFoundView';

export default function MovieDetailView() {
  const { slug } = useParams();
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
    return <div>Тут ничего нет</div>;
  }
  if (status === 'pending') {
    return <div>Загружаю</div>;
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
