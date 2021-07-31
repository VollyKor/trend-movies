import { createAsyncThunk } from '@reduxjs/toolkit';
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
    const response = await auth.checkToken(token);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const logout = createAsyncThunk(
  'auth/logout',
  async (data, thunkAPI) => {
    try {
      const response = await auth.login(data);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (data, thunkAPI) => {
    try {
      const response = await auth.login(data);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);
