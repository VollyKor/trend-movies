import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from 'service/apiRequest';

export const login = createAsyncThunk('auth/login', async data => {
  try {
    return await auth.login(data);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const checkToken = createAsyncThunk('auth/checkToken', async token => {
  try {
    return await auth.checkToken(token);
  } catch (error) {
    throw new Error(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
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
