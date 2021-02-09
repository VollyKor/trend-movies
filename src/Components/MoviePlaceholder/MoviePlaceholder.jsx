import emptyListPlaceholder from '../../Images/EmptyListPlaceholder.jpg';

export default function MoviePlaceholder() {
  return (
    <div className="thumb">
      <img
        src={emptyListPlaceholder}
        style={{ margin: '0 auto' }}
        alt="emptyListPlaceholder"
      ></img>
    </div>
  );
}
