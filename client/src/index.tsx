import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import RootComponent from 'component/RootComponent';
import 'antd/dist/antd.css';

ReactDOM.render(
  <BrowserRouter>
    <RootComponent />
  </BrowserRouter>,
  document.getElementById('root')
);
