import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { useHistory } from 'react-router';
import s from './GoBackButton.module.css';
export default function GoBackButton() {
  const history = useHistory();

  function handleClick() {
    history.push(history.location?.state?.from ?? '/');
  }

  return (
    <button onClick={handleClick} className={s.button}>
      <FaArrowAltCircleLeft className={s.icon} />
      <span>Go back</span>
    </button>
  );
}
