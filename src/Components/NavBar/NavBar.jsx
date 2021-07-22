import { ButtonGroup, Button, Modal, makeStyles, Box } from '@material-ui/core';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import { SearchForm, Container } from 'components';
import SignUpForm from '../auth/SignUpForm';

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
  const [open, setOpen] = useState(false);
  const classes = useStyle();

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
          <ButtonGroup
            variant="contained"
            color="primary"
            aria-label="contained primary button group"
          >
            <Button onClick={() => setOpen(true)}>Log In</Button>
            <Button>Sign Up</Button>
          </ButtonGroup>
        </div>
      </Container>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box className={classes.wrapper}>
          <SignUpForm onClose={() => setOpen(false)} />
        </Box>
      </Modal>
    </header>
  );
};

export default NavBar;
