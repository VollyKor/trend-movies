import s from './MovieCard.module.css';
export default function FilmView({ data }) {
  const {
    backdrop_path,
    title,
    release_date,
    vote_average,
    overview,
    genres,
  } = data;
  return (
    <div className="flex-box">
      <img
        src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        alt={title}
      />
      <div className={s.desc}>
        <h2>
          {`${title}`}
          <span className={s.release_date}>({release_date.slice(0, 4)})</span>
        </h2>
        <p>
          UserScore
          <span className={s.span}>{`${vote_average}`}</span>
        </p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <h3 className={s.subtitle}>Genres</h3>
        <ul className={`flex-box ${s.list}`}>
          {genres.map(({ name }) => {
            return (
              <li key={name} className={s['list-item']}>
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
