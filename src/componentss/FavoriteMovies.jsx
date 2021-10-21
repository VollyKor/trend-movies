import { useEffect } from 'react';
import slugify from 'slugify';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ItemCard } from 'componentss';
import { getFavMovies } from 'redux/favoriteMovies/favoriteMovies.actions';
import s from 'components/Gallery/Gallery.module.css';

const FavoriteMovies = () => {
  const favoriteMovies = useSelector(state => state.favMovies.favMovies);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavMovies());

    return () => {};
  }, [dispatch]);

  return (
    favoriteMovies && (
      <ul className={s.list}>
        {favoriteMovies.map(el => (
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
    )
  );
};

export default FavoriteMovies;
