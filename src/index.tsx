import 'normalize.css';
import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from 'redux/store';
import App from './components/App/App';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      {console.log('Backend host: ', process.env.REACT_APP_API_HOST)}
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
