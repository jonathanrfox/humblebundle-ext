import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './components/App';


require('./icons/icon-19.png');
require('./icons/icon-38.png');
require('./fonts/fonts.css');
injectGlobal`
  body {
    margin: 0;
  }
`;
ReactDOM.render(<App/>, document.getElementById('app'));
