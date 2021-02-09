import { NavLink } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm';
import s from './NavBar.module.css';
import Container from '../../service/Container';

export default function NavBar() {
  return (
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
          </ul>
          <SearchForm />
        </div>
      </Container>
    </header>
  );
}
