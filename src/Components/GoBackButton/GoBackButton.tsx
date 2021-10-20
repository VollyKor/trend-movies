import { useHistory } from 'react-router';
import { Button } from '@material-ui/core';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

import s from './GoBackButton.module.css';

const GoBackButton = () => {
  const history = useHistory();

  const handleClick = () => history.push(history.location?.state?.from ?? '/');

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
      style={{ marginRight: '16px' }}
    >
      <FaArrowAltCircleLeft className={s.icon} />
      <span>Go back</span>
    </Button>
  );
};

export default GoBackButton;
