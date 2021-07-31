import axios from 'axios';

const apiRequest = {
  API_KEY: process.env.REACT_APP_TMBD_KEY,
  BASE_URL: 'https://api.themoviedb.org/3',
  page: 1,
  reviewPage: 1,

  defaultPage() {
    this.page = 1;
  },

  setPage(pageValue) {
    this.page = pageValue;
  },

  async searchFilms(query) {
    try {
      const res = await axios.get(
        `${this.BASE_URL}/search/movie?api_key=${this.API_KEY}&query=${query}`,
      );
      const { data } = res;
      return data;
    } catch (error) {
      throw error;
    }
  },

  getFilmById(id) {
    return axios
      .get(`${this.BASE_URL}/movie/${id}?api_key=${this.API_KEY}`)
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  getTrendFilms(page = 1) {
    return axios
      .get(
        `${this.BASE_URL}/trending/movie/day?api_key=${this.API_KEY}&page=${page}`,
      )
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  getReview(id) {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${this.API_KEY}&language=en-US&page=${this.reviewPage}`,
      )
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },

  getImgURL(size = 'original', url) {
    return `https://image.tmdb.org/t/p/${size}${url}`;
  },

  getApiConfig() {
    return axios.get(
      `https://api.themoviedb.org/3/configuration?api_key=${this.API_KEY}`,
    );
  },

  getMovieCredits(id) {
    return axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${this.API_KEY}&language=en-US`,
      )
      .then(({ data }) => data);
  },

  getApiGenresList() {
    return axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`,
    );
  },
};

export const statistic = {
  BASE_URL: process.env.REACT_APP_API_HOST,

  async send(filmData) {
    try {
      const res = await axios.post(`${this.BASE_URL}/statistic`, filmData);
      const { resData } = res;
      return resData;
    } catch (error) {
      throw error;
    }
  },
};

export const auth = {
  BASE_URL: process.env.REACT_APP_API_HOST,
  async login(data) {
    try {
      const res = await axios.post(`${this.BASE_URL}/users/login`, data);
      const { data: resData } = res;
      return resData;
    } catch (error) {
      throw error;
    }
  },

  async checkToken(token) {
    try {
      const res = await axios.post(`${this.BASE_URL}/users/check-token`, '', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data } = res;
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default apiRequest;
