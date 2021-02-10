import { Link, useLocation } from 'react-router-dom';
import ItemCard from './ItemCard/ItemCard';
import s from './Gallery.module.css';

export default function Gallery({ data }) {
  const location = useLocation();

  return (
    <>
      <ul className={s.list}>
        {data.map(e => (
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
    </>
  );
}
