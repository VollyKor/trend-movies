import { createSlice } from '@reduxjs/toolkit';
import { getTrendMovies } from './movies.actions';

const initialState = {
  movies: [],
  error: null,
};

export const counterSlice = createSlice({
  name: 'moviesReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTrendMovies.fulfilled, (state, action) => {
      console.log('state', state);
      console.log('movies', action);
    });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
