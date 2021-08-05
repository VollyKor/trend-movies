import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from 'service/proxyWrapper';
import { token } from 'service/proxyWrapper';

export const login = createAsyncThunk('auth/login', async data => {
  try {
    const response = await auth.login(data);
    console.log(response);
    token.set(response.accessToken);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const checkToken = createAsyncThunk('auth/checkToken', async key => {
  try {
    await auth.checkToken(key);
    token.set(key);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  token.set(null);
  return '';
});

export const signup = createAsyncThunk('auth/signup', async data => {
  try {
    const response = await auth.signup(data);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const setError = createAction('auth/error');
