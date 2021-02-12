import s from './Review.module.css';
import ReviewItem from '../ReviewItem/ReviewItem';
import EmptyView from '../../../EmptyView/EmptyView';

export default function Review({ dataObj }) {
  const { results } = dataObj;

  if (results.length === 0) {
    return <EmptyView />;
  }

  return (
    <ul className={s.list}>
      {results.map(reviewObj => {
        return <ReviewItem key={reviewObj.id} reviewObj={reviewObj} />;
      })}
    </ul>
  );
}
