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
      <div>
        <h2>{`${title} (${release_date.slice(0, 4)})`}</h2>
        <p>{`UserScore ${vote_average}`}</p>
        <h3>Overview</h3>
        <p>{overview}</p>
        <ul className="flex-box">
          {genres.map(({ name }) => {
            return (
              <li key={name}>
                <p>{name}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
