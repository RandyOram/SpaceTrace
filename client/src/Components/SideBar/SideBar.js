import React, { Component } from 'react'
import './SideBar.css';
import SignUpForm from '../UserAuthForms/SignUpForm.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Button, Nav, NavItem } from 'react-bootstrap'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            buttonPressed: false,
            loginPressed: false
        };

        this.showSideBar = this.showSideBar.bind(this);
        this.triggerLoginDropdown = this.triggerLoginDropdown.bind(this);
    }
    
    showSideBar () {
        this.setState({ buttonPressed: !this.state.buttonPressed });
        this.forceUpdate();
    }

    triggerLoginDropdown () {
        this.setState({ loginPressed: !this.state.loginPressed });
        this.forceUpdate();
    }

    render() {
        let { buttonPressed, loginPressed } = this.state;

        return (
            <div className="sideBarContainer">
                {
                    !buttonPressed && (
                        <button className="btn btn-primary btn-lg sideBarButton" onClick={this.showSideBar}>
                            <FontAwesomeIcon className="sideBar-button-size" icon={faBars}></FontAwesomeIcon>
                        </button>
                    )
                }
                
                {
                    buttonPressed && (
                        <div className="sideBar col-lg-6 col-md-12 col-sm-12 col-xs-12">
                                <div className="row">
                                    <div className="col-10">
                                        <span className="menu-title">
                                            space trace
                                        </span>
                                    </div>
                                    <div className="col-2">
                                        <div className="menu-close" onClick={this.showSideBar}>
                                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu-credit row">
                                    data obtained from http://open-notify.org/
                                </div>
                                <div className="login row" onClick={this.triggerLoginDropdown}>
                                    <div>
                                        {
                                            !loginPressed && (
                                                <div className="menu-login-caret">
                                                    <FontAwesomeIcon icon={faCaretRight}></FontAwesomeIcon>
                                                </div>
                                            )
                                        }
                                        {
                                            loginPressed && (
                                                <div className="menu-login-caret">
                                                    <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div>
                                        <div className="menu-login-title">
                                            log in
                                        </div>
                                    </div>
                                </div>
                                {
                                    loginPressed && (
                                        <div className="row">
                                            <SignUpForm />
                                        </div>
                                    )
                                }
                        </div>
                    )
                } 
            </div>
        )
    }
}
