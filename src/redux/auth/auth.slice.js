import { createSlice } from '@reduxjs/toolkit';

import { checkToken, login } from './auth.actions';

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  token: null,
};

export const counterSlice = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.token = payload.accessToken;
        state.isLoggedIn = true;
        localStorage.setItem('token', payload.accessToken);
      })
      .addCase(checkToken.fulfilled, (state, { payload }) => {
        state.token = localStorage.getItem('token');
        state.isLoggedIn = true;
        console.log('payload', payload);
        state.user = payload;
      })
      .addCase(checkToken.rejected, (state, { payload }) => {
        localStorage.removeItem('token');
        state.isLoggedIn = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
