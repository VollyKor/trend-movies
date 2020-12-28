export default function ActorsList({ dataObj }) {
  const { id, cast } = dataObj;
  return (
    <ul>
      {cast.map(({ name }) => {
        return (
          <li key={`${id} ${name}`}>
            <p>{name}</p>
          </li>
        );
      })}
    </ul>
  );
}
