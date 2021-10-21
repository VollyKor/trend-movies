import s from './ProductionCompanies.module.css';
import logoPlaceholder from 'Images/LogoPlaceholder.png';

const ProductionCompanies = ({ dataArray }) => (
  <ul className={s.list}>
    {dataArray.map(({ name, id, logo_path }) => (
      <li key={id} className={s.item}>
        {logo_path ? (
          <img
            className={s.img}
            src={`https://image.tmdb.org/t/p/w500${logo_path}`}
            alt={`logo of ${name}`}
          />
        ) : (
          <img className={s.img} src={logoPlaceholder} alt="empty logo" />
        )}
        <p className={s.itemName}>{name}</p>
      </li>
    ))}
  </ul>
);

export default ProductionCompanies;
