import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import { Switch } from "react-router"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app-state';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    {/* <Switch></Switch> */}
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
