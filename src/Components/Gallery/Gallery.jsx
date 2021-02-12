import { Link, useLocation } from 'react-router-dom';
import ItemCard from './ItemCard/ItemCard';
import s from './Gallery.module.css';
import slugify from 'slugify';

export default function Gallery({ data }) {
  const location = useLocation();
  console.log(data);
  return (
    <>
      <ul className={s.list}>
        {data.map(e => {
          // console.log(slugify(`${e.title} ${e.id}`, { lower: true }));
          return (
            <li key={e.id} className={s.item}>
              <Link
                to={{
                  pathname: `/movies/${slugify(`${e.title} ${e.id}`, {
                    lower: true,
                  })}`,
                  state: {
                    from: location,
                  },
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
}
