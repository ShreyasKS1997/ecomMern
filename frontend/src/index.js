import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import AlertContainer from './component/Alert/AlertElement';
//todo handle error

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertContainer />
    <App />
  </Provider>
);
