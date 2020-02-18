/**
 * @file React binding to HTML file
 * @author kudlav & anik97 (MIT License)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import './main.scss'


// Project page
ReactDOM.render(<App />, document.getElementById('app'));
