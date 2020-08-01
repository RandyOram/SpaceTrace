import React, { Component } from 'react'
import './SignInForm.css'

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
 
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
     
        this.props.firebase
            .signIn(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState({ error });
            });
     
        event.preventDefault();
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        return (
            <form className="login-form input-group" onSubmit={this.onSubmit}>
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
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <div className="signin-btn-container">
                    <button className="btn btn-signin" type="submit" onSubmit={this.onSubmit}>
                        Sign In
                    </button>
                </div>
                {error && <div className="error">{error.message}</div>}
            </form>
        )
    }
}

export default SignInForm