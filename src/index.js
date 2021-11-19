import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n.js';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

ReactDOM.render(
  //add App component inside browser router component, and add inside provider, then embed into root element of index.html
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);