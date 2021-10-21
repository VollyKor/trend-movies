import { useState } from 'react';
import { makeStyles, Box, TextField, Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { setError, signup } from 'redux/auth/auth.actions';

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

export default function SignupForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const error = useSelector(state => state.auth.error);
  const classes = useStyles();
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setError());

    if (password.length > 4 && password === confirmPassword) {
      dispatch(signup({ email, password }));
      props.onClose();
    } else {
      dispatch(setError({ message: 'validation failed' }));
    }
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

        <TextField
          type="password"
          id="confirm-password"
          label="repeat password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {error && <p>{error?.message}</p>}

        <Box className={classes.btnWrapper}>
          <Button
            color="secondary"
            className={classes.cancelButton}
            type="button"
            onClick={() => props.onClose()}
          >
            Cancel
          </Button>
          <Button color="primary" className={classes.submit} type="submit">
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
}
