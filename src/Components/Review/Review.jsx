import ReviewItem from 'components/ReviewItem/ReviewItem';
import EmptyView from 'components/EmptyView';

import s from './Review.module.css';

const Review = ({ dataObj: { results } }) =>
  results.length === 0 ? (
    <EmptyView />
  ) : (
    <ul className={s.list}>
      {results.map(reviewObj => (
        <ReviewItem key={reviewObj.id} reviewObj={reviewObj} />
      ))}
    </ul>
  );

export default Review;
