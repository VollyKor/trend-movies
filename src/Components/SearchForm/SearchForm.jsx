import { useState } from 'react';
import { BsSearch as Icon } from 'react-icons/bs';
import s from './SearchForm.module.css';

export default function SearchForm() {
  const [query, setQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (query.length > 0) {
      console.log('отправляем ', query);
    }
    return;
  }
  return (
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
  );
}
