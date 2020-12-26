import { useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { BsSearch as Icon } from 'react-icons/bs';
import s from './SearchForm.module.css';

export default function SearchForm({ searchQuery }) {
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [submitQuery, setSubmitQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (query.length > 0 && submitQuery !== query) {
      history.push('/movies');
      setSubmitQuery(query);
      searchQuery(query);
    }
  }
  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          <input
            className={s.input}
            type="text"
            placeholder="query"
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
