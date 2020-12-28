import { useEffect, useState } from 'react';
import s from './HomeView.module.css';
import request from '../../service/apiRequest';
import Gallery from '../Gallery/Gallery';
import DownloadView from '../DownloadView/DownloadView';
import NotFoundView from '../NotFoundView/NotFoundView';
export default function HomeView() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  const HandleChange = ({ selected }) => {
    // if (selected + 1 !== page) {
    console.log(selected);
    setPage(selected + 1);
    // }
    // setStatus('pending');
    // request.getTrendFilms(page).then(data => {
    //   setData(data);
    //   setPage(data.page);

    //   if (data.results.length > 0) {
    //     setStatus('resolved');
    //   }
    // });
  };

  useEffect(() => {
    setStatus('pending');
    request
      .getTrendFilms(page)
      .then(data => {
        setData(data);

        if (data.results.length > 0) {
          setStatus('resolved');
        }
      })
      .catch(error => {
        setStatus('rejected');
        throw error;
      });
  }, [page]);

  if (status === 'idle') {
    return <h2>:Ждем</h2>;
  }
  if (status === 'pending') {
    return <DownloadView />;
  }
  if (status === 'resolved') {
    return (
      <Gallery
        arrayOfObjects={data}
        handleChange={HandleChange}
        page={page}
      ></Gallery>
    );
  }
  return <NotFoundView />;
}
