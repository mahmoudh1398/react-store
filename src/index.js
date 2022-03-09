import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import {App} from './App';
import 'asset/styles/style.scss';
import store from "redux/store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
        <App />
        <ToastContainer newestOnTop={true} rtl pauseOnFocusLoss />
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
