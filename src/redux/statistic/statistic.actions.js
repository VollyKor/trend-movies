import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest, { statistic } from 'service/apiRequest';
import { BackEndAPi } from 'service/apiRequest';

export const statisticHandler = createAsyncThunk(
  'statistic/handler',
  async (film, thunkApi) => {
    const state = thunkApi.getState();

    statistic.send(state.auth.user, film);
  },
);
