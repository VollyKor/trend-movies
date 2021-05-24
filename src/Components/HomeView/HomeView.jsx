import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import Gallery from 'components/Gallery/Gallery';
import DownloadView from 'components/DownloadView/DownloadView';
import NotFoundView from 'components/NotFoundView/NotFoundView';

import request from 'service/apiRequest';
import s from './HomeView.module.css';

export default function HomeView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  const { total_pages, results } = data;

  const HandleChange = e => {
    setCurrentPage(e.selected + 1);
  };

  useEffect(() => {
    setStatus('pending');
    request
      .getTrendFilms(currentPage)
      .then(data => {
        setData(data);

        data.results.length > 0 ? setStatus('resolved') : setStatus('rejected');
      })
      .catch(() => {
        setStatus('rejected');
      });
  }, [currentPage]);

  switch (status) {
    case 'pending':
      return <DownloadView />;
    case 'resolved':
      return (
        <>
          <Gallery data={results} />

          <ReactPaginate
            pageCount={total_pages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            initialPage={currentPage - 1}
            disableInitialCallback
            onPageChange={HandleChange}
            containerClassName={s.pagination}
            pageClassName={s.page_item}
            activeClassName={s.page_item__active}
            previousClassName={s.previousButton}
            nextClassName={s.nextButton}
            pageLinkClassName={s.page_link}
            breakLinkClassName={s.ellipsis}
          />
        </>
      );

    case 'rejected':
      return <NotFoundView />;

    default:
      return <NotFoundView />;
  }
}
