import { useEffect, useState } from 'react';
import { NavLink, useParams, useRouteMatch, Route } from 'react-router-dom';
import request from '../../../service/apiRequest';
import ProductionCompanies from './ProductionCompanies/ProductionCompanies';
import Review from './Review/Review';
import ActorsList from './ActorsList/ActorsList';
import s from './MovieAdditionalInfo.module.css';

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
      <div className={s.wrapper}>
        <h3 className={s.title}>Additional information</h3>
        <ul className={s.linkList}>
          <li key={1} className={s.item}>
            <NavLink
              to={`${url}/production-companies`}
              className={s.link}
              activeClassName={s.linkActive}
            >
              Production Companies
            </NavLink>
          </li>
          <li key={2} className={s.item}>
            <NavLink
              className={s.link}
              activeClassName={s.linkActive}
              to={`${url}/reviews`}
            >
              Reviews
            </NavLink>
          </li>
          <li key={3} className={s.item}>
            <NavLink
              className={s.link}
              activeClassName={s.linkActive}
              to={`${url}/cast`}
            >
              Cast
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={s.addInfoWrapper}>
        <Route path={`${url}/production-companies`}>
          <ProductionCompanies dataArray={production_companies} />
        </Route>
        <Route path={`${url}/reviews`}>
          {reviewData && <Review dataObj={reviewData} />}
        </Route>
        <Route path={`${url}/cast`}>
          {castData && <ActorsList dataObj={castData} />}
        </Route>
      </div>
    </div>
  );
}
