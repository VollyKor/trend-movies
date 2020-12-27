import { FaArrowAltCircleLeft } from 'react-icons/fa';

import { useHistory } from 'react-router';
import s from './GoBackButton.module.css';
export default function GoBackButton() {
  const history = useHistory();
  return (
    <button className={s.button} onClick={history.goBack}>
      <FaArrowAltCircleLeft className={s.icon} /> Go back
    </button>
  );
}
