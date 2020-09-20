import React from 'react';
import ReactDOM from 'react-dom';
// import { addLocaleData } from 'react-intl';

// import en from 'react-intl/locale-data/en';
// import cs from 'react-intl/locale-data/cs';

import App from './App';

import './index.css';

import * as serviceWorker from './serviceWorker';

// addLocaleData(en);
// addLocaleData(cs);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
