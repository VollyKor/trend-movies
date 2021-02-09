import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BsSearch as Icon } from 'react-icons/bs';
import axios from 'axios';
import request from '../../service/apiRequest';

import s from './SearchForm.module.css';

export default function SearchForm() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [submitQuery, setSubmitQuery] = useState('');

  // async function searchFilms(query) {
  //   const response = await axios.get(
  //     `https://api.themoviedb.org/3/search/movie?api_key=132f2a543c82d69a556f0bb280a697a7&query=${query}`,
  //   );
  //   const { data } = response;
  //   console.log(data);
  //   return data;
  // }

  function handleSubmit(e) {
    e.preventDefault();

    if (query.length > 0 && submitQuery !== query) {
      history.push({
        ...location,
        pathname: '/movies',
        search: `query=${query}`,
      });
      setSubmitQuery(query);
      // searchFilms(submitQuery);
    }
  }
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          <span className={s.inputDescr}>Search Film</span>
          <input
            className={s.input}
            type="text"
            placeholder="write something"
            onChange={({ target: { value } }) => setQuery(value)}
            value={query}
          />
          <button className={s.button} type="submit">
            <Icon aria-label="Search Icom" className={s.icon} />
          </button>
        </label>
      </form>
    </>
  );
}
