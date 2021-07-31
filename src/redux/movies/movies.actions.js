import { createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from '../../service/apiRequest';

export const getTrendMovies = createAsyncThunk(
  'movies/getTrendMovies',
  async () => {
    try {
      const response = await apiRequest.getTrendFilms();
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },
);
