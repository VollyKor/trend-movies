import Gallery from 'components/Gallery/Gallery';

const MoviesView = ({ data }) => data && <Gallery data={data.results} />;

export default MoviesView;
