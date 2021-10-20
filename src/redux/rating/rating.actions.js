import { createAsyncThunk as thunk } from '@reduxjs/toolkit';

import apiRequest from 'service/apiRequest';

export const getAllRating = thunk('getAll', async () => {
  return apiRequest.getAll();
});

export const handleRating = thunk('handle', async film => {
  const filmData = {
    filmId: film.filmId,
    rating: film.rating,
  };

  return apiRequest.handleRating(filmData);
});

export const getAverageRating = thunk('getAverage', async filmId => {
  return apiRequest.getAverageRating(filmId);
});
