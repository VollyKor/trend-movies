import axios from 'axios';

const BackEndAPi = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

export const token = {
  set(token) {
    BackEndAPi.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    BackEndAPi.defaults.headers.common.Authorization = null;
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
