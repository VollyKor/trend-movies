import s from './Review.module.css';
import MoviePlaceholder from '../../../MoviePlaceholder/MoviePlaceholder';

export default function Review({ dataObj }) {
  const { results } = dataObj;

  if (results.length === 0) {
    return <MoviePlaceholder />;
  }

  function handleClick(event) {
    console.log('showMore');
  }

  return (
    <ul className={s.list}>
      {results.map(({ author, content, id }) => {
        return (
          <li key={id} className={s.item}>
            <h4 className={s.title}>{author}</h4>
            <p className={s.text}>
              {content}{' '}
              <button className={s.button} type="button" onClick={handleClick}>
                show more
              </button>
            </p>
          </li>
        );
      })}
    </ul>
  );
}
