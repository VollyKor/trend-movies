import s from './ItemCard.module.css';
import empteImgURL from 'Images/imgPlaceholder.png';

const ItemCard = ({ item: { title, backdrop_path } }) => (
  <div className={s.thumb}>
    {backdrop_path ? (
      <img
        className={s.img}
        src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
        alt={title ?? 'Unknown title'}
      />
    ) : (
      <img className={s.img} src={empteImgURL} alt={title ?? 'Unknown title'} />
    )}
    <p className={s.title}>{title ?? 'Error, title is absent'}</p>
  </div>
);
export default ItemCard;
