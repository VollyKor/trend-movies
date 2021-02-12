import emptyListPlaceholder from '../../Images/EmptyListPlaceholder.jpg';

export default function EmptyView() {
  return (
    <div className="thumb">
      <img
        src={emptyListPlaceholder}
        style={{ margin: '0 auto', maxHeight: '450px' }}
        alt="emptyListPlaceholder"
      ></img>
    </div>
  );
}
