import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import './index.css'
import Parent from './Parent.js'
import * as firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDrFINpmRYbewGwfGER3S3lsaqEmWpK1F4",
    authDomain: "space-trace-277015.firebaseapp.com",
    databaseURL: "https://space-trace-277015.firebaseio.com",
    projectId: "space-trace-277015",
    storageBucket: "space-trace-277015.appspot.com",
    messagingSenderId: "1043632187016",
    appId: "1:1043632187016:web:705059ad81a8bd1731e13d",
    measurementId: "G-BC4LEK6Y31"
};
firebase.initializeApp(firebaseConfig);

mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZHlvcmFtIiwiYSI6ImNrNjFhOHp5MDAwYWEzZW1tNG03MW5oMjkifQ.s-mh2kWUPhtPQRrXesmdrQ';

ReactDOM.render(
    <Parent />,
    document.getElementById('root')
);