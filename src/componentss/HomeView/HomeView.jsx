import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { getTrendMovies, setPage } from 'redux/movies/movies.actions';
import { Gallery, DownloadView, NotFoundView } from 'componentss';
import s from './HomeView.module.css';

export default function HomeView() {
  const [status, setStatus] = useState('idle');

  const dispatch = useDispatch();
  const movies = useSelector(({ movies }) => movies);
  const { totalPages, trendMovies, page } = movies;

  useEffect(() => {
    setStatus('pending');

    dispatch(getTrendMovies(page));
    trendMovies.length > 0 ? setStatus('resolved') : setStatus('rejected');
  }, [page, dispatch, trendMovies.length]);

  switch (status) {
    case 'pending':
      return <DownloadView />;
    case 'resolved':
      return (
        <>
          <Gallery />

          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            initialPage={page - 1}
            disableInitialCallback
            onPageChange={e => dispatch(setPage(e.selected + 1))}
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
