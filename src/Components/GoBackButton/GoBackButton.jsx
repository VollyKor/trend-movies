import { useHistory } from 'react-router';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import s from './GoBackButton.module.css';

const GoBackButton = () => {
  const history = useHistory();

  const handleClick = () => history.push(history.location?.state?.from ?? '/');

  return (
    <button onClick={handleClick} className={s.button}>
      <FaArrowAltCircleLeft className={s.icon} />
      <span>Go back</span>
    </button>
  );
};

export default GoBackButton;
