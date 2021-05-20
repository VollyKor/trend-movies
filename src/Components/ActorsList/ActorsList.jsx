import s from './ActorsList.module.css';
import actorsPlaceholder from 'Images/actorsPlaceholder.png';

const ActorsList = ({ dataObj: { cast } }) => (
  <ul className={s.list}>
    {cast.map(({ name, id, profile_path }) => (
      <li key={`${id} ${name}`} className={s.item}>
        {profile_path ? (
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w500${profile_path}`}
            alt={` of ${profile_path}`}
          />
        ) : (
          <img className={s.img} src={actorsPlaceholder} alt={` of ${name}`} />
        )}
        <p className={s.name}>{name}</p>
      </li>
    ))}
  </ul>
);

export default ActorsList;
