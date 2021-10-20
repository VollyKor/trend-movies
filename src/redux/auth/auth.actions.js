import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import apiRequest from 'service/apiRequest';

export const login = createAsyncThunk('auth/login', async data => {
  const response = await apiRequest.login(data);
  apiRequest._setToken(response.accessToken);
  return response;
});

export const checkToken = createAsyncThunk('auth/checkToken', async key => {
  await apiRequest.checkToken(key);
  apiRequest._setToken(key);
});

export const logout = createAsyncThunk('auth/logout', async () => {
  apiRequest._setToken(null);
  return '';
});

export const signup = createAsyncThunk('auth/signup', async data => {
  return apiRequest.signup(data);
});

export const setError = createAction('auth/error');
