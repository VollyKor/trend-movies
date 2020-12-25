import { NavLink } from 'react-router-dom';
import s from './NavBar.module.css';

export default function NavBar() {
  return (
    <header className="header">
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
            to="./movies"
            exact
            className={s.link}
            activeClassName={s['active-link']}
          >
            Movies
          </NavLink>
        </li>
      </ul>
      <hr></hr>
    </header>
  );
}
