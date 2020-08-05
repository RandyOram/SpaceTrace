/* Sign up form obtained from https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial */

import React, { Component } from 'react'
import './SignUpForm.css'
import Loading from '../Loading/Loading.js'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm } from 'react-hook-form'

const INITIAL_STATE = {
    name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    waiting: false,
    notify: false,
    latitude: 0.0,
    longitude: 0.0,
    phone: '',
    coordWaiting: false
};

class SignUpForm extends Component {
    constructor(props) {
        super(props);
 
        this.state = { ...INITIAL_STATE };
        this.toggleWait = this.toggleWait.bind(this)
        this.toggleCoordWait = this.toggleCoordWait.bind(this)
        this.toggleNotify = this.toggleNotify.bind(this)
        this.getLocation = this.getLocation.bind(this)
    }

    onSubmit = event => {
        const { email, passwordOne, name, phone, notify, latitude, longitude } = this.state;

        this.toggleWait()

        this.props.firebase
            .createUser(email, passwordOne, name, phone, notify, notify, latitude, longitude)
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

    toggleCoordWait() {
        this.setState({ coordWaiting: !this.state.coordWaiting })
    };

    toggleNotify() {
        this.setState({ notify: !this.state.notify })
    };

    getLocation() {
        this.toggleCoordWait();
        if (window.navigator.geolocation) {
            window.navigator.geolocation
                .getCurrentPosition((location) => {
                    console.log(location)
                    this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
                    this.toggleCoordWait();
                }, console.log);
        }
    };

    render() {
        const { register, handleSubmit, watch, errors } = useForm();

        const {
            name,
            email,
            passwordOne,
            passwordTwo,
            error,
            waiting,
            notify,
            latitude,
            longitude,
            coordWaiting,
            phone
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
                                ref={register({required: true})}
                            />
                            <input
                                className="input-group-text"
                                name="email"
                                value={email}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Email Address"
                                ref={register({required: true})}
                            />
                            <input
                                className="input-group-text"
                                name="passwordOne"
                                value={passwordOne}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Password"
                                ref={register({required: true})}
                            />
                            <input
                                className="input-group-text"
                                name="passwordTwo"
                                value={passwordTwo}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Confirm Password"
                                ref={register({required: true})}
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
                                    <div className="extra-fields-container">
                                        <div className="btn-container">
                                            <button className="btn btn-light" disabled={!notify} type="button" onClick={this.getLocation}>
                                                Share Location
                                            </button>
                                        </div>
                                        {
                                            !coordWaiting && (
                                                <div className="lat-long-container">
                                                    <input
                                                        className="input-group-text"
                                                        name="latitude"
                                                        value={latitude}
                                                        type="text"
                                                        placeholder="Latitude"
                                                        disabled={true}
                                                    />
                                                    <input
                                                        className="input-group-text"
                                                        name="longitude"
                                                        value={longitude}
                                                        type="text"
                                                        placeholder="Longitude"
                                                        disabled={true}
                                                    />
                                                </div>
                                            )
                                        }
                                        {
                                            coordWaiting && (
                                                <div className="center top-space">
                                                    <Loading />
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            {
                                notify && (
                                    <div className="phone-input-container">
                                        <PhoneInput
                                            country={'us'}
                                            onlyCountries={['us']}
                                            value={this.state.phone}
                                            onChange={phone => this.setState({ phone })}
                                        />
                                    </div>
                                )
                            }
                            <div className="btn-container">
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