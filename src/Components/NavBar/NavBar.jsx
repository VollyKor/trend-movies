import { NavLink } from 'react-router-dom';

import SearchForm from 'components/SearchForm/SearchForm';
import Container from 'components/Container';

import s from './NavBar.module.css';

const NavBar = () => (
  <header className={s.header}>
    <Container>
      <div className={s.wrapper}>
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

          <li className={s.item}>
            <NavLink
              to="/table"
              className={s.link}
              activeClassName={s['active-link']}
            >
              Table
            </NavLink>
          </li>
        </ul>
        <SearchForm />
      </div>
    </Container>
  </header>
);

export default NavBar;
