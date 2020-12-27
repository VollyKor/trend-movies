import { useEffect, useState } from 'react';
import { Link, useParams, useRouteMatch, Route } from 'react-router-dom';
import request from '../../../service/apiRequest';
import ProductionCompanies from './ProductionCompanies/ProductionCompanies';
import Review from './Review/Review';
import ActorsList from './ActorsList/ActorsList';
export default function AdditionalMovieInfo({
  filmData: { production_companies },
}) {
  const { url } = useRouteMatch();
  const { movieId } = useParams();
  const [reviewData, setReviewData] = useState(null);
  const [castData, setCastData] = useState(null);

  useEffect(() => {
    request.getReview(movieId).then(data => {
      setReviewData(data);
    });

    request.getMovieCredits(movieId).then(data => {
      setCastData(data);
    });
  }, [movieId]);

  return (
    <div>
      <h3>Additional information</h3>
      <ul>
        <li key={1}>
          <Link to={`${url}/production-companies`}>Production Companies</Link>
        </li>
        <li key={2}>
          <Link to={`${url}/reviews`}>Reviews</Link>
        </li>
        <li key={3}>
          <Link to={`${url}/cast`}>Cast</Link>
        </li>
      </ul>
      <Route path={`${url}/production-companies`}>
        <ProductionCompanies dataArray={production_companies} />
      </Route>
      <Route path={`${url}/reviews`}>
        {reviewData && <Review dataObj={reviewData} />}
      </Route>
      <Route path={`${url}/cast`}>
        {reviewData && <ActorsList dataObj={castData} />}
      </Route>
    </div>
  );
}
