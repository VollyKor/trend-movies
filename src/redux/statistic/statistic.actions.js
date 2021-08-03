import { createAsyncThunk } from '@reduxjs/toolkit';
import { statistic } from 'service/proxyWrapper';

export const statisticHandler = createAsyncThunk(
  'statistic/handler',
  async (film, thunkApi) => {
    const state = thunkApi.getState();

    statistic.send(state.auth.user, film);
  },
);
