import React, { Component } from 'react'
import './CoordinateBar.css'

class CoordinateBar extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState){
        return (this.props.lng !== nextProps.lng);
    }


    render() {
        return (
            <div className="coordinate-bar-style">
                <div className="coordinate-bar-text">
                    space trace ~ Longitude: {this.props.lng} | Latitude: {this.props.lat}
                </div>
            </div>
            
        )
    }
}
export default CoordinateBar;