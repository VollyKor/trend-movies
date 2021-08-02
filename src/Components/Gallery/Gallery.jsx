import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import slugify from 'slugify';

import { ItemCard } from 'components';
import { statisticHandler } from 'redux/statistic/statistic.actions';
import s from './Gallery.module.css';

const Gallery = () => {
  const movies = useSelector(state => state.movies.trendMovies);
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <>
      <ul className={s.list}>
        {movies.map(el => (
          <li key={el.id} className={s.item}>
            <Link
              onClick={() => dispatch(statisticHandler(el))}
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
    </>
  );
};

export default Gallery;
