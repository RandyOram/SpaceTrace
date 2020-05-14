/* Sign up form obtained from https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial */

import React, { Component } from 'react'
import './SignUpForm.css'

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
 
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {

    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form className="login-form input-group" onSubmit={this.onSubmit}>
                <input
                    className="input-group-text"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="User name"
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
                <div className="signin-btn-container">
                    <button className="btn btn-signin" disabled={isInvalid} type="submit">
                        Sign Up
                    </button>
                </div>
                {error && <p>{error.message}</p>}
            </form>
        )
    }
}

export default SignUpForm