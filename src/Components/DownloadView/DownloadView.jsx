import logo from '../../Images/logo.svg';
import s from './DownloadView.module.css';
export default function DownloadView() {
  return (
    <div>
      <h2 className={s.title}>Downloading...</h2>
      <img src={logo} alt="logo" className={`App-logo ${s.logo}`} />
    </div>
  );
}
