import { NavLink } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import s from './NavBar.module.css';

export default function NavBar({ searchQuery }) {
  return (
    <header className={s.header}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            to="/"
            exact
            className={s.link}
            activeClassName={s['active-link']}
          >
            Home
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            to="/movies"
            className={s.link}
            activeClassName={s['active-link']}
          >
            Movies
          </NavLink>
        </li>
      </ul>
      <SearchForm searchQuery={searchQuery} />
    </header>
  );
}
