import { useEffect, useState } from 'react';
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  useLocation,
} from 'react-router-dom';

import { ProductionCompanies, ActorsList, Review } from 'components';

import s from './MovieAdditionalInfo.module.css';
import req from 'service/apiRequest';

const MovieAdditionalInfo = ({ filmData: { production_companies } }) => {
  const [reviewData, setReviewData] = useState(null);
  const [castData, setCastData] = useState(null);

  const { state, pathname } = useLocation();
  const { url } = useRouteMatch();
  const { slug } = useParams();

  const idFromSLug = slug.match(/[0-9a-zA-Z]+$/)[0];

  useEffect(() => {
    if (pathname === `${url}/reviews`) {
      req.getReview(idFromSLug).then(data => setReviewData(data));
    }

    if (pathname === `${url}/cast`) {
      req.getMovieCredits(idFromSLug).then(data => setCastData(data));
    }
  }, [idFromSLug, pathname, url]);

  return (
    <div>
      <div className={s.wrapper}>
        <h3 className={s.title}>Additional information</h3>

        <ul className={s.linkList}>
          <li key={1} className={s.item}>
            <NavLink
              to={{
                pathname: `${url}/production-companies`,
                state,
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
                state,
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
                state,
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
};

export default MovieAdditionalInfo;
