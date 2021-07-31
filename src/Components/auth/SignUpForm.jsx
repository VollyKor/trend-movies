import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from 'redux/auth/auth.actions';
import { TextField, makeStyles, Box, Button } from '@material-ui/core';

import { auth } from 'service/apiRequest';

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  email: {
    marginBottom: 10,
  },
  btnWrapper: {
    marginTop: theme.spacing(4),
  },
  submit: {},
  cancelButton: {
    marginRight: theme.spacing(4),
  },
}));

export default function SignUpForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dipatch = useDispatch();
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    dipatch(login({ username: email, password }));
    // await auth.login({ username: email, password });
    props.onClose();
  }

  return (
    <Box className={classes.wrapper}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          className={classes.email}
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Box className={classes.btnWrapper}>
          <Button
            color="secondary"
            className={classes.cancelButton}
            type="button"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            className={classes.submit}
            type="submit"
            // onClick={e => e.preventDefault()}
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
}
