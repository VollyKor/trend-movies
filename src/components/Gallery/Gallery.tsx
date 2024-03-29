import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import slugify from 'slugify';

import { ItemCard } from 'components';
import s from './Gallery.module.css';
import { getTM } from 'redux/movies/movies.selectors';

interface Imovies {
  title: string;
  id: number;
}

const Gallery = () => {
  const movies: Imovies[] = useSelector(getTM);
  const location = useLocation();

  return (
    <ul className={s.list}>
      {movies.map(el => (
        <li key={el.id} className={s.item}>
          <Link
            to={{
              pathname: `/movies/${slugify(`${el.title} ${el.id}`, {
                lower: true,
              })}`,
              state: { from: location },
            }}
            key={el.id}
            className={s.link}
          >
            <ItemCard item={el} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Gallery;
