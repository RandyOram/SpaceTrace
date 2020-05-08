import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CoordinateBar from './CoordinateBar.js';
import LiveFeed from './LiveFeed.js';
import SideBar from './SideBar.js';
import Map from './Map.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

export const MyContext = React.createContext();

class Parent extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            lng: 5,
            lat: 34
        };

        this.handler = this.handler.bind(this);
    }

    // THIS IS NOT CHANGING PARENT STATE, IT IS CHANGING MAP STATE
    handler(lat, lng) {
        this.setState({lat: lat, lng: lng});
    }

    render () {
        return (
            <div id="parentRoot">
                <Map lng={this.state.lng} lat={this.state.lat} handler={(lng, lat) => this.handler(lng, lat)}/>
                <div className="no-pointer-events container-fluid fullHeight">
                    <div className="row fullHeight">

                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="row test">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <CoordinateBar lng={this.state.lng} lat={this.state.lat} />
                                </div>
                            </div>
                            <div id="content-desktop" className="row test">
                                <div className="componentContainer">
                                    <LiveFeed />
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <SideBar />
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Parent;