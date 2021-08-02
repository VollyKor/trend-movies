import { createSlice } from '@reduxjs/toolkit';
import { statisticHandler } from './statistic.actions';

const initialState = {
  data: null,
  error: null,
};

export const statisticSlice = createSlice({
  name: 'statisticReducer',
  initialState,
  reducers: {},
  extraReducers: builder =>
    builder.addCase(statisticHandler.fulfilled, (state, action) => {}),
});

export default statisticSlice.reducer;
