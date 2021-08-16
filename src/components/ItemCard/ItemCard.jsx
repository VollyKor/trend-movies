import s from './ItemCard.module.css';
import empteImgURL from 'Images/imgPlaceholder.png';

const ItemCard = ({ item }) => {
  return (
    <div className={s.thumb}>
      {item?.backdrop_path ? (
        <img
          className={s.img}
          src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
          alt={item?.title ?? 'Unknown title'}
        />
      ) : (
        <img
          className={s.img}
          src={empteImgURL}
          alt={item?.title ?? 'Unknown title'}
        />
      )}
      <p className={s.title}>{item?.title ?? 'Error, title is absent'}</p>
    </div>
  );
};
export default ItemCard;
