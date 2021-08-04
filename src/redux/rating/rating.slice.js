import { createSlice } from '@reduxjs/toolkit';
import { getAllRating, getAverageRating, handleRating } from './rating.actions';

const initialState = {
  moviesArr: [],
};

export const ratingSlice = createSlice({
  name: 'movieRating',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllRating.fulfilled, (state, { payload }) => {
        console.log('getAllRating', payload);
      })
      .addCase(getAverageRating.fulfilled, (state, { payload }) => {
        console.log('getAllRating', payload);
      })
      .addCase(handleRating.fulfilled, (state, { payload }) => {
        console.log('getAllRating', payload);
      });
  },
});

export default ratingSlice.reducer;
