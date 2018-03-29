import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';

import App from './components/App';

// stylesheets
require('./fonts/fonts.css');

// global styles
injectGlobal`
  body {
    margin: 0;
  }
`;

// icons
require('./icons/icon-19.png');
require('./icons/icon-38.png');


// render
ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
