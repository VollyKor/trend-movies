import Gallery from '../Gallery/Gallery';

export default function MoviesView({ data }) {
  console.log(data);
  return data && <Gallery data={data} />;
}
