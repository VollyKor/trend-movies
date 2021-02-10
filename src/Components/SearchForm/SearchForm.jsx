import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BsSearch as Icon } from 'react-icons/bs';

import s from './SearchForm.module.css';

export default function SearchForm() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [submitQuery, setSubmitQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (query.length > 0 && submitQuery !== query) {
      history.push({
        ...location,
        pathname: '/movies',
        search: `query=${query}`,
      });
      setSubmitQuery(query);
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
