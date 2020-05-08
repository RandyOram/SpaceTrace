import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Button, Nav, NavItem } from 'react-bootstrap'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            buttonPressed: false,
        };

        this.showSideBar = this.showSideBar.bind(this);
    }
    
    showSideBar () {
        this.setState({ buttonPressed: !this.state.buttonPressed });
        this.forceUpdate();
    }

    render() {
        let { buttonPressed } = this.state;

        return (
            <div className="sideBarContainer">
                {
                    !buttonPressed && (
                        <button className="btn btn-primary btn-lg sideBarButton" onClick={this.showSideBar}>
                            <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
                        </button>
                    )
                }
                
                {
                    buttonPressed && (
                        <div className="sideBar col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div className="menu-close" onClick={this.showSideBar}>
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                            </div>   
                        </div>
                    )
                } 
            </div>
        )
    }
}
