import axios from 'axios';

const BackEndAPi = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export const token = {
  set(token) {
    BackEndAPi.defaults.headers.Authorization = `Bearer ${token}`;
  },
  unset() {
    BackEndAPi.defaults.headers.Authorization = null;
  },
};

export const statistic = {
  async send(userData, filmData) {
    try {
      const res = await BackEndAPi.post(`/statistic`, {
        user: userData,
        data: filmData,
      });
      const { resData } = res;
      return resData;
    } catch (error) {
      throw error;
    }
  },
};

export const auth = {
  async login(data) {
    try {
      const res = await BackEndAPi.post(`/users/login`, data);
      const { data: resData } = res;
      if (resData?.accessToken) token.set(resData.accessToken);
      return resData;
    } catch (error) {
      throw error;
    }
  },
  async signup(data) {
    try {
      const res = await BackEndAPi.post(`/users/signup`, data);
      const { data: resData } = res;
      if (resData?.accessToken) token.set(resData.accessToken);
      return resData;
    } catch (error) {
      throw error;
    }
  },

  async checkToken(token) {
    try {
      const res = await BackEndAPi.post(`/users/check-token`, '', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = res;
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export const rating = {
  async getAll() {
    try {
      const response = await BackEndAPi.get('/rating');
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async handleRating(data) {
    try {
      const response = BackEndAPi.post('/rating/handle', data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  async getAverageRating(filmId) {
    try {
      BackEndAPi.get(`/rating/average/${filmId}`);
    } catch (error) {
      console.error(error);
    }
  },
};
