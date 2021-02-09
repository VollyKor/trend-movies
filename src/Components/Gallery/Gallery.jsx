import { Link, useLocation } from 'react-router-dom';
import ItemCard from './ItemCard/ItemCard';
import s from './Gallery.module.css';
import ReactPaginate from 'react-paginate';

export default function Gallery({ data, handleChange, page }) {
  const { total_pages, results } = data;
  const location = useLocation();

  return (
    <>
      <ul className={s.list}>
        {results.map(e => (
          <li key={e.id} className={s.item}>
            <Link
              to={{
                pathname: `/movies/${e.id}`,
                state: { from: location },
              }}
              key={e.id}
              className={s.link}
            >
              <ItemCard item={e} />
            </Link>
          </li>
        ))}
      </ul>
      <ReactPaginate
        pageCount={total_pages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handleChange}
        containerClassName={s.pagination}
        pageClassName={s.pag_item}
        activeClassName={s.pag_item__active}
        disableInitialCallback
      />
    </>
  );
}
