export default function Review({ dataObj }) {
  const { results } = dataObj;

  if (results.length === 0) {
    return <div>Обзоров нет</div>;
  }

  return (
    <ul>
      {results.map(({ author, content, id }) => {
        return (
          <li key={id}>
            <h4>{author}</h4>
            <p>{content}</p>
          </li>
        );
      })}
    </ul>
  );
}
