/* Sign up form obtained from https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial */

import React, { Component } from 'react'
import './SignUpForm.css'
import Loading from '../Loading/Loading.js'

const INITIAL_STATE = {
    name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    waiting: false,
    notify: false
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
 
        this.state = { ...INITIAL_STATE };
        this.toggleWait = this.toggleWait.bind(this)
        this.toggleNotify = this.toggleNotify.bind(this)
    }

    onSubmit = event => {
        const { name, email, passwordOne } = this.state;
     
        this.toggleWait()

        this.props.firebase
            .createUser(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.toggleWait()
            })
            .catch(error => {
                this.setState({ error });
                this.toggleWait()
            });
     
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    toggleWait() {
        this.setState({ waiting: !this.state.waiting })
    };

    toggleNotify() {
        this.setState({ notify: !this.state.notify })
    };

    render() {
        const {
            name,
            email,
            passwordOne,
            passwordTwo,
            error,
            waiting,
            notify
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            name === '';

        return (
            <div>
                {
                    !waiting && (
                        <form className="login-form input-group" onSubmit={this.onSubmit}>
                            <input
                                className="input-group-text"
                                name="name"
                                value={name}
                                onChange={this.onChange}
                                type="text"
                                placeholder="First Name"
                            />
                            <input
                                className="input-group-text"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                            />
                            <input
                                className="input-group-text"
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                            />
                            <input
                                className="input-group-text"
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Confirm Password"
                            />
                            <div className="permission-container">
                                <input
                                    className="input-group-check"
                                    name="notify"
                                    value={notify}
                                    onChange={this.toggleNotify}
                                    check={this.state.isGoing}
                                    type="checkbox"
                                    placeholder="Sign up for ISS location notifications"
                                />
                                <div className="permission-text">
                                    I want to know when the ISS flies over my location!
                                </div>
                            </div>
                            {
                                notify && (
                                    <div>
                                        HELLO
                                    </div>
                                )
                            }
                            <div className="signin-btn-container">
                                <button className="btn btn-signin" disabled={isInvalid} type="submit" onSubmit={this.onSubmit}>
                                    Sign Up
                                </button>
                            </div>
                            {error && <div className="error">{error.message}</div>}
                        </form>
                    )
                }
                {
                    waiting && (
                        <div className="center">
                            <Loading />
                        </div>
                    )
                }
            </div>
        )
    }
}

export default SignUpForm