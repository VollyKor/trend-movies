export default function ActorsList({ dataObj }) {
  const { id, cast } = dataObj;
  console.log(dataObj);
  return (
    <ul>
      {cast.map(({ name }) => {
        return (
          <li key={id}>
            <p>{name}</p>
          </li>
        );
      })}
    </ul>
  );
}
