import React, { Component } from 'react'
import './SignInForm.css'
import Loading from '../Loading/Loading.js'

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    waiting: false
};

class SignInForm extends Component {
    constructor(props) {
        super(props);
 
        this.state = { ...INITIAL_STATE };
        this.toggleWait = this.toggleWait.bind(this)
    }

    onSubmit = event => {
        const { email, password } = this.state;
     
        this.toggleWait();

        this.props.firebase
            .signIn(email, password)
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

    render() {
        const {
            email,
            password,
            error,
            waiting
        } = this.state;

        return (
            <div>
                {
                    !waiting && (
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

export default SignInForm