import s from './InitialDownload.module.css';
import logo from '../../Images/logo.svg';

export default function InitialDownload() {
  return (
    <div className={s.backdrop}>
      <div className={s.imgContainer}>
        <img src={logo} alt="logo" className={`App-logo ${s.img}`} />
      </div>
    </div>
  );
}
