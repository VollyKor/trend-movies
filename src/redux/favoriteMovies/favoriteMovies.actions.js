import { createAsyncThunk as thunk } from '@reduxjs/toolkit';

import apiRequest from 'service/apiRequest';

export const getFavMovies = thunk('favMovies/get', async () => {
  return await apiRequest.getFavMovies();
});

export const getFavMoviesList = thunk('favMovies/getList', async () => {
  return apiRequest.getFavMoviesList();
});

export const addFavMovie = thunk('favMovies/add', async movie => {
  const response = await apiRequest.addFavMovies(movie.id);
  return { movie, data: response };
});

export const removeFavMovie = thunk('favMovies/remove', async ({ id }) => {
  const response = await apiRequest.removeFavMovies(id);
  return { id, data: response };
});
