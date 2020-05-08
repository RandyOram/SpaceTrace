import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import './index.css';
import Parent from './Parent.js';
import * as serviceWorker from './serviceWorker';

mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZHlvcmFtIiwiYSI6ImNrNjFhOHp5MDAwYWEzZW1tNG03MW5oMjkifQ.s-mh2kWUPhtPQRrXesmdrQ';

ReactDOM.render(
    <Parent />,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
