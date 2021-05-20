import s from './InitialDownload.module.css';
import logo from 'Images/logo.svg';

const InitialDownload = () => (
  <div className={s.backdrop}>
    <div className={s.imgContainer}>
      <img src={logo} alt="logo" className={`App-logo ${s.img}`} />
    </div>
  </div>
);

export default InitialDownload;
