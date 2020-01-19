import React from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <HelmetProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </HelmetProvider>,
  document.getElementById('root')
);
