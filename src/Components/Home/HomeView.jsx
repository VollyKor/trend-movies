import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './HomeView.module.css';
import request from '../../service/apiRequest';

export default function HomeView() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState({});

  useEffect(() => {
    setStatus('pending');
    request.getTrendFilms().then(data => {
      setData(data);
      setStatus('resolved');
    });
  }, []);

  if (status === 'idle') {
    return <h2>:Ждем</h2>;
  }
  if (status === 'resolved') {
    console.log(data);
    return data.results.map(e => {
      return (
        <Link to={`/movies/${e.title ?? e.name}`} key={e.id} className={s.link}>
          {e.title ?? e.name}
        </Link>
      );
    });
  }
  return <h2>Пусто</h2>;
  // return <div>Что то пошло не так</div>;
}
