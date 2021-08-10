import { createAsyncThunk } from '@reduxjs/toolkit';
import { rating } from 'service/proxyWrapper';

export const getAllRating = createAsyncThunk('getAll', async () => {
  try {
    const result = await rating.getAll();
    return result;
  } catch (error) {
    console.error(error);
  }
});

export const handleRating = createAsyncThunk('handle', async film => {
  try {
    const filmData = {
      filmId: film.filmId,
      rating: film.rating,
    };

    await rating.handleRating(filmData);
    return filmData;
  } catch (error) {
    console.error(error);
  }
});

export const getAverageRating = createAsyncThunk('getAverage', async filmId => {
  try {
    const result = await rating.getAverageRating(filmId);
    return result;
  } catch (error) {
    console.error(error);
  }
});
