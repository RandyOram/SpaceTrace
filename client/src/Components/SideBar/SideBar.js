import React, { Component } from 'react'
import './SideBar.css'
import { FirebaseContext } from '../Firebase/index.js'
import SignUpForm from '../UserAuthForms/SignUpForm.js'
import SignUpForm2 from '../UserAuthForms/SignUpForm2.js'
import SignInForm from '../UserAuthForms/SignInForm.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            buttonPressed: false,
            loginPressed: false,
            userLoggedIn: false
        };

        this.showSideBar = this.showSideBar.bind(this);
        this.toggleLoginSwitch = this.toggleLoginSwitch.bind(this);
        this.signOut = this.signOut.bind(this);
        //this.triggerLoginDropdown = this.triggerLoginDropdown.bind(this);
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged(function(user) {
            if (user) {
                this.setState({ userLoggedIn: true });
            } else {
                this.setState({ userLoggedIn: false });
            }
          }.bind(this));
    }

    signOut() {
        this.props.firebase
            .signOut()
            .catch(error => {
                this.setState({ error });
        });
    }
    
    showSideBar () {
        this.setState({ buttonPressed: !this.state.buttonPressed });
        this.forceUpdate();
    }

    toggleLoginSwitch () {
        this.setState({ loginPressed: !this.state.loginPressed });
        this.forceUpdate();
    }

    /*triggerLoginDropdown () {
        this.setState({ loginPressed: !this.state.loginPressed });
        this.forceUpdate();
    }*/

    render() {
        let { buttonPressed, loginPressed, userLoggedIn } = this.state;

        const HoverText = styled.div`
                :hover {
                    color: rgba(255, 255, 255, 0.5);
                    cursor: pointer;
            }
        `

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
                        <div className="sideBar col-xl-6 col-lg-9 col-md-12 col-sm-12 col-xs-12">
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
                                {/*<div className="login row" onClick={this.triggerLoginDropdown}>
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
                                </div>*/}
                                {
                                    !userLoggedIn && (
                                        <div className="set-height">
                                            <div className="row">
                                                <div className={`login-switch left-space ${!loginPressed ? "active" : ""}`} onClick={this.toggleLoginSwitch}>
                                                    create account
                                                </div>
                                                <div className='login-switch left-right-space'>
                                                    or
                                                </div>
                                                <div className={`login-switch ${loginPressed ? "active" : ""}`} onClick={this.toggleLoginSwitch}>
                                                    log in
                                                </div>
                                            </div>
                                            {
                                                loginPressed && (
                                                    <div className="row top-buffer">
                                                        <FirebaseContext.Consumer>
                                                            { firebase => <SignInForm firebase={firebase} /> }
                                                        </FirebaseContext.Consumer>
                                                    </div>
                                                )
                                            }
                                            {
                                                !loginPressed && (
                                                    <div className="row top-buffer">
                                                        <FirebaseContext.Consumer>
                                                            { firebase => <SignUpForm2 firebase={firebase} /> }
                                                        </FirebaseContext.Consumer>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                                {
                                    userLoggedIn && (
                                        <div className="row top-buffer logout" onClick={this.signOut}>
                                            <HoverText className="menu-logout-title">
                                                log out
                                            </HoverText>
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