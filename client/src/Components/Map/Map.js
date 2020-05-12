import React, { Component } from 'react'
import './Map.css'
import mapboxgl from 'mapbox-gl';
import * as d3 from "d3";

var coordinates = [[]];

class Map extends Component {
    constructor(props) {
        super(props);
    }

    getInitCoords() {
        var coordinates;
        d3.json('http://api.open-notify.org/iss-now.json')
        .then
        (
            function(data, err)
            {
                if (err) {
                    console.log(err);
                    throw err;
                }
                
                coordinates = [data.iss_position.longitude,data.iss_position.latitude];
            }   
        );
        return coordinates;
    }

    componentDidMount()
    {
        var props = this.props;
        var coordinates = [];
        var geojson = 
        {
            type: "FeatureCollection", 
            features : 
            [{ 
                type : "Feature", 
                geometry : 
                { 
                    type : "LineString",
                    coordinates : [

                    ]
                } 
            }]
        };
        var point = {
            type: "FeatureCollection", 
            features : 
            [{ 
                type : "Feature", 
                geometry : 
                { 
                    type : "Point",
                    coordinates : [0,0]
                } 
            }]
        };

        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/randyoram/ck61bhbgu08yf1iqx79efimc9',
            sprite: 'mapbox://sprites/mapbox/bright-v8',
            center: this.getInitCoords(),
            zoom: 4
        });

        map.on('load', function() {
            map.jumpTo({ 'zoom': 4 });

            d3.json('http://api.open-notify.org/iss-now.json')
            .then(function(data, err){
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    coordinates[0] = [data.iss_position.longitude,data.iss_position.latitude];
                    props.handler(coordinates[0][0],coordinates[0][1]);
                    geojson.features[0].geometry.coordinates = [coordinates[0]];
                    point.features[0].geometry.coordinates = coordinates[0];
                    map.panTo(coordinates[0]);
                }   
            );

            map.addSource('trace', { type: 'geojson', data: geojson });
            map.addLayer({
                    'id': 'trace',
                    'type': 'line',
                    'source': 'trace',
                    'paint': {
                        'line-color': 'white',
                        'line-opacity': 0.75,
                        'line-width': 5
                    }
            });
            map.addSource('point', { type:  'geojson', data: point });
            map.addLayer({
                'id': 'point',
                'source': 'point',
                'type': 'symbol',
                'layout': {
                    'icon-image': 'international-space-station-2',
                    'icon-allow-overlap': true,
                    'icon-ignore-placement': true
                }

            });

            var i = 1;
            var userPanned = false;
            var timer = window.setInterval(function() {
                d3.json('http://api.open-notify.org/iss-now.json')
                .then(function(data, err) {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        
                        coordinates[i] = [data.iss_position.longitude,data.iss_position.latitude];
                        props.handler(coordinates[i][0],coordinates[i][1]);
                        
                        geojson.features[0].geometry.coordinates.push(coordinates[i]);
                        point.features[0].geometry.coordinates = coordinates[i];

                        map.getSource('trace').setData(geojson);
                        map.getSource('point').setData(point);

                        map.once("dragstart", () => { userPanned = true; });

                        if (!userPanned) { map.panTo(coordinates[i]); }
                    }
                )
            }, 1000)
        });
    }

    render() {
        return (
            <div>
                <div>
                    <div ref={el => this.mapContainer = el} className="mapContainer"/>
                </div>
            </div>
            
        )
    }
    
}

export default Map;