import s from './Review.module.css';
import MoviePlaceholder from '../../../MoviePlaceholder/MoviePlaceholder';
import ReviewItem from '../ReviewItem/ReviewItem';

export default function Review({ dataObj }) {
  const { results } = dataObj;

  if (results.length === 0) {
    return <MoviePlaceholder />;
  }

  return (
    <ul className={s.list}>
      {results.map(reviewObj => {
        return <ReviewItem key={reviewObj.id} reviewObj={reviewObj} />;
      })}
    </ul>
  );
}
