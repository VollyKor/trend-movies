import { Gallery } from 'components';

const MoviesView = ({ data }) => data && <Gallery data={data.results} />;

export default MoviesView;
