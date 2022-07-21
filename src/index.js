import './css/body.css';
import './css/app.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import store  from './store/airCallStore';
import { Provider } from 'react-redux';
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
document.getElementById('app'));