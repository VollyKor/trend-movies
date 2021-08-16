import emptyListPlaceholder from 'Images/EmptyListPlaceholder.jpg';

const EmptyView = () => (
  <div className="thumb">
    <img
      src={emptyListPlaceholder}
      style={{ margin: '0 auto', maxHeight: '450px' }}
      alt="emptyListPlaceholder"
    ></img>
  </div>
);

export default EmptyView;
