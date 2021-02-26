import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConnectedRouter} from 'connected-react-router';
import { Provider } from 'react-redux';
import { store } from './app-state';
import { Switch } from 'react-router';
import { appRoutes } from './app-routes';
import {history} from './history-instance'; 

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <Switch>{appRoutes}</Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
