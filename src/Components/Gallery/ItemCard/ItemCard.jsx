import s from './ItemCard.module.css';
export default function ItemCard({ item }) {
  const { title, backdrop_path } = item;
  return (
    <div className={s.thumb}>
      <img
        className={s.img}
        src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
        alt={title ?? 'Назваание неизвестно'}
      />
      <p className={s.title}>{title ?? 'Ошибка!!! Название отсутствует'}</p>
    </div>
  );
}
