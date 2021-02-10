import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import request from '../../../service/apiRequest';
import MovieCard from '../MovieCard/MovieCard';
import MovieAdditionalInfo from '../MovieAdditionalInfo/MovieAdditionalInfo';
import GoBackButton from '../GoBackButton/GoBackButton';
import NotFoundView from '../../NotFoundView/NotFoundView';

export default function MovieDetailView() {
  const { movieId } = useParams();
  const [data, setData] = useState({});
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    setStatus('pending');

    request
      .getFilmById(movieId)
      .then(data => {
        setData(data);
        setStatus('resolved');
      })
      .catch(error => {
        setStatus('rejected');
        throw error;
      });
  }, [movieId]);

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
