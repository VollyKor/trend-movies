import axios from 'axios';

class ApiRequest {
  request;
  token;

  constructor() {
    this.request = axios.create({
      baseURL: 'https://trend-movies.herokuapp.com/',
    });
  }

  _setToken(token) {
    this.request.defaults.headers.Authorization = `Bearer ${token}`;
  }
  _unsetToken() {
    this.request.defaults.headers.Authorization = null;
  }

  async signup(userCreds) {
    try {
      const { data } = await this.request.post(`/users/signup`, userCreds);

      if (data?.accessToken) this._setToken(data.accessToken);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    try {
      const { data: resData } = await this.request.post(`/users/login`, data);

      if (resData?.accessToken) this._setToken(resData.accessToken);
      return resData;
    } catch (error) {
      throw error;
    }
  }

  async checkToken(token) {
    try {
      this._setToken(token);
      return (await this.request.post(`/users/check-token`)).data;
    } catch (error) {
      throw error;
    }
  }

  async searchFilms(query) {
    try {
      return (await this.request.get(`tmbd/search/movie?query=${query}`)).data;
    } catch (error) {
      throw error;
    }
  }

  async getFilmById(id) {
    try {
      return (await this.request.get(`/tmbd/movie/${id}`)).data;
    } catch (error) {
      throw error;
    }
  }

  async getTrendFilms(page = 1) {
    try {
      return (await this.request.get(`tmbd/trend-movies/${page}`)).data;
    } catch (error) {
      throw error;
    }
  }

  async getReview(id, page = 1) {
    return this.request
      .get(`tmbd/review/${id}/${page}`)
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });
  }

  getImgURL(size = 'original', url) {
    return `https://image.tmdb.org/t/p/${size}${url}`;
  }

  async getMovieCredits(id) {
    return this.request
      .get(`/tmbd/movie-credits/${id}`)
      .then(({ data }) => data)
      .catch(err => {
        throw err;
      });
  }

  async getApiGenresList() {
    try {
      return this.request.get(`/genre/movie/list?language=en-US`);
    } catch (error) {
      throw error;
    }
  }

  async getAllRatingInfo() {
    try {
      return (await this.request.get('/rating')).data;
    } catch (error) {
      throw error;
    }
  }

  async handleRating(data) {
    try {
      return (await this.request.post('/rating/handle', data)).data;
    } catch (error) {
      throw error;
    }
  }
  async getAverageRating(filmId) {
    try {
      return (await this.request.get(`/rating/average/${filmId}`)).data;
    } catch (error) {
      throw error;
    }
  }

  async getFavMovies() {
    try {
      return (await this.request.get(`/favorite-movies`)).data;
    } catch (error) {
      throw error;
    }
  }

  async addFavMovies(id) {
    try {
      return (
        await this.request.post(`/favorite-movies/add`, {
          movieId: id,
        })
      ).data;
    } catch (error) {
      throw error;
    }
  }

  async removeFavMovies(id) {
    try {
      return (await this.request.delete(`/favorite-movies/remove/${id}`)).data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ApiRequest();
