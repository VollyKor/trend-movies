import actorsPlaceholder from 'Images/actorsPlaceholder.png';
import { makeStyles } from '@material-ui/core';

type Props = {
  dataObj: {
    cast: Icast[];
  };
};

interface Icast {
  name: string;
  id: number;
  profile_path: string;
}

const useStyles = makeStyles(theme => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  item: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '10px',
    maxWidth: '200px',
  },
  img: {
    boxSizing: 'border-box',
    display: 'block',
    maxWidth: '100%',
    objectFit: 'scale-down',
    borderColor: '#20232a',
    borderSpacing: '3px',
    borderStyle: 'solid',
    borderRadius: '5px',
    marginBottom: '30px',
  },
  name: {
    fontSize: '18px',
    textAlign: 'center',
    color: '#61dafb',
    padding: '10px 0px',
    marginTop: '10px',
    marginBottom: '0px',
    backgroundColor: '#20232a',
    borderRadius: '3px',
  },
}));

export default function ActorsList({ dataObj: { cast } }: Props): JSX.Element {
  const s = useStyles();
  return (
    <ul className={s.list}>
      {cast.map(({ name, id, profile_path }) => (
        <li key={`${id}:${name}`} className={s.item}>
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
            />
          )}
          <p className={s.name}>{name}</p>
        </li>
      ))}
    </ul>
  );
}
