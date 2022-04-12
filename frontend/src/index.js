import React from "react";
import App from './App';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {createRoot}  from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('root')
);

reportWebVitals();