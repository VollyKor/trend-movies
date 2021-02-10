import NotFoundImg from '../../Images/404_page_cover.jpg';

export default function NotFoundView() {
  return (
    <img
      src={NotFoundImg}
      alt="not found view with funny pinguin"
      style={{ display: 'block', margin: '10px auto' }}
    />
  );
}
