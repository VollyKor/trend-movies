import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import slugify from 'slugify';

import { ItemCard } from 'components';
import s from './Gallery.module.css';

const Gallery = () => {
  const movies = useSelector(state => state.movies.trendMovies);
  const location = useLocation();

  return (
    <>
      <ul className={s.list}>
        {movies.map(e => (
          <li key={e.id} className={s.item}>
            <Link
              to={{
                pathname: `/movies/${slugify(`${e.title} ${e.id}`, {
                  lower: true,
                })}`,
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
    </>
  );
};

export default Gallery;
