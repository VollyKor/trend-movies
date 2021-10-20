import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import apiRequest from 'service/apiRequest';

export const getTrendMovies = createAsyncThunk(
  'movies/getTrendMovies',
  async page => {
    try {
      return await apiRequest.getTrendFilms(page);
    } catch (error) {
      throw new Error(error.message);
    }
  },
);

export const setPage = createAction('setPage');

export const searchFilms = createAsyncThunk(
  'movies/getSearchFilms',
  async searchParams => {
    try {
      return await apiRequest.searchFilms(searchParams);
    } catch (error) {
      throw error;
    }
  },
);
