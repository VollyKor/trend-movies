import { ButtonGroup, Button, Modal, makeStyles, Box } from '@material-ui/core';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { SearchForm, Container } from 'components';
import SignUpForm from 'components/auth/SignUpForm';
import LoginForm from 'components/auth/LoginForm';

import { logout } from 'redux/auth/auth.actions';

import s from './NavBar.module.css';

const useStyle = makeStyles(theme => ({
  wrapper: {
    maxWidth: 400,
    margin: '30vh auto',

    backgroundColor: 'white',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(4),
  },
}));

const NavBar = () => {
  const [isOpenLoginForm, setIsOpenLoginForm] = useState(false);
  const [isOpenSignupForm, setIsOpenSignupForm] = useState(false);
  const classes = useStyle();

  const dispatch = useDispatch();
  const isLoggerIn = useSelector(state => state.auth.isLoggedIn);

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

            {isLoggerIn && (
              <li className={s.item}>
                <NavLink
                  to="/table"
                  className={s.link}
                  activeClassName={s['active-link']}
                >
                  Table
                </NavLink>
              </li>
            )}
          </ul>

          <SearchForm />
          {isLoggerIn ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Log Out
            </Button>
          ) : (
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button onClick={() => setIsOpenLoginForm(true)}>Log In</Button>
              <Button onClick={() => setIsOpenSignupForm(true)}>Sign Up</Button>
            </ButtonGroup>
          )}
        </div>
      </Container>
      <Modal
        open={isOpenSignupForm}
        onClose={() => setIsOpenSignupForm(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.wrapper}>
          <SignUpForm onClose={() => setIsOpenSignupForm(false)} />
        </Box>
      </Modal>

      <Modal
        open={isOpenLoginForm}
        onClose={() => {
          setIsOpenLoginForm(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.wrapper}>
          <LoginForm onClose={() => setIsOpenLoginForm(false)} />
        </Box>
      </Modal>
    </header>
  );
};

export default NavBar;
