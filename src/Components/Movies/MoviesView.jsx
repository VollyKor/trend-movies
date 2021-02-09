import Gallery from '../Gallery/Gallery';

export default function MoviesView({ data }) {
  return data && <Gallery data={data} />;
}
