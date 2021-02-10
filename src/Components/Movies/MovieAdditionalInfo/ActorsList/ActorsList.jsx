import s from './ActorsList.module.css';
import actorsPlaceholder from '../../../../Images/actorsPlaceholder.png';

export default function ActorsList({ dataObj: { cast } }) {
  return (
    <ul className={s.list}>
      {cast.map(({ name, id, profile_path }) => {
        return (
          <li key={`${id} ${name}`} className={s.item}>
            {profile_path ? (
              <img
                className={s.img}
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={` of ${profile_path}`}
              />
            ) : (
              <img
                className={s.img}
                src={actorsPlaceholder}
                alt={` of ${name}`}
                style={{ marginBottom: '30px' }}
              />
            )}
            <p className={s.name}>{name}</p>
          </li>
        );
      })}
    </ul>
  );
}
