import { Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';

import ItemCard from '../ItemCard/ItemCard';

import s from './Gallery.module.css';

const Gallery = ({ data }) => {
  const location = useLocation();
  return (
    <>
      <ul className={s.list}>
        {data.map(e => {
          return (
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
          );
        })}
      </ul>
    </>
  );
};

export default Gallery;
