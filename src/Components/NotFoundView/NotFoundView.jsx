import NotFoundImg from 'Images/404_page_cover.jpg';

const NotFoundView = () => (
  <img
    src={NotFoundImg}
    alt="not found view with funny pinguin"
    style={{ display: 'block', margin: '10px auto' }}
  />
);

export default NotFoundView;
