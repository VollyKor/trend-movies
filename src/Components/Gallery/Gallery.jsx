import { Link } from 'react-router-dom';
import ItemCard from './ItemCard/ItemCard';
import s from './Gallery.module.css';
export default function Gallery({ arrayOfObjects }) {
  console.log(arrayOfObjects);
  return (
    <ul className={s.list}>
      {arrayOfObjects.map(e => (
        <li key={e.id} className={s.item}>
          <Link to={`/movies/${e.id}`} key={e.id} className={s.link}>
            <ItemCard item={e} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
