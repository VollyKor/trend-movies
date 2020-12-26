export default function ProductionCompanies({ dataArray }) {
  return (
    <ul>
      {dataArray.map(({ name }) => {
        return (
          <li key={name}>
            {/* <img src="" alt=""/> */}
            <p>{name}</p>
          </li>
        );
      })}
    </ul>
  );
}
