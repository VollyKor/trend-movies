import { useEffect, useState } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  useHistory,
} from 'react-router-dom';
import request from '../../../service/apiRequest';
import ProductionCompanies from './ProductionCompanies/ProductionCompanies';
import Review from './Review/Review';
import ActorsList from './ActorsList/ActorsList';
import s from './MovieAdditionalInfo.module.css';
import { useLocation } from 'react-router-dom';

export default function AdditionalMovieInfo({
  filmData: { production_companies },
}) {
  const { url } = useRouteMatch();
  const { slug } = useParams();
  const [reviewData, setReviewData] = useState(null);
  const [castData, setCastData] = useState(null);
  const location = useLocation();
  const idFromSLug = slug.match(/[0-9a-zA-Z]+$/)[0];

  useEffect(() => {
    if (location.pathname === `${url}/reviews`) {
      request.getReview(idFromSLug).then(data => {
        setReviewData(data);
      });
    }
    if (location.pathname === `${url}/cast`) {
      request.getMovieCredits(idFromSLug).then(data => {
        setCastData(data);
      });
    }
  }, [idFromSLug, location.pathname, url]);

  return (
    <div>
      <div className={s.wrapper}>
        <h3 className={s.title}>Additional information</h3>
        <ul className={s.linkList}>
          <li key={1} className={s.item}>
            <NavLink
              to={{
                pathname: `${url}/production-companies`,
                state: { ...location.state },
              }}
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
              to={{
                pathname: `${url}/reviews`,
                state: { ...location.state },
              }}
            >
              Reviews
            </NavLink>
          </li>
          <li key={3} className={s.item}>
            <NavLink
              className={s.link}
              activeClassName={s.linkActive}
              to={{
                pathname: `${url}/cast`,
                state: { ...location.state },
              }}
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
