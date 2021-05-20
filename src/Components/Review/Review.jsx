import ReviewItem from 'components/ReviewItem/ReviewItem';
import EmptyView from 'components/EmptyView';

import s from './Review.module.css';

const Review = ({ dataObj }) => {
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
};

export default Review;
