/**
 * @file React binding to HTML file
 * @author kudlav & anik97 (MIT License)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';

import './main.scss'

import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

import '../node_modules/material-design-icons-iconfont/dist/material-design-icons.css'
import '../node_modules/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.eot'
import '../node_modules/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.ttf'
import '../node_modules/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff'
import '../node_modules/material-design-icons-iconfont/dist/fonts/MaterialIcons-Regular.woff2'

// Project page
ReactDOM.render(<App />, document.getElementById('app'));
