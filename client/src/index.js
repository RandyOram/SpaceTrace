import React from 'react'
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl'
import './index.css'
import Parent from './Parent.js'
import Firebase, { FirebaseContext } from './Components/Firebase/index.js'

mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZHlvcmFtIiwiYSI6ImNrNjFhOHp5MDAwYWEzZW1tNG03MW5oMjkifQ.s-mh2kWUPhtPQRrXesmdrQ';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <Parent />
    </FirebaseContext.Provider>,
    document.getElementById('root')
);