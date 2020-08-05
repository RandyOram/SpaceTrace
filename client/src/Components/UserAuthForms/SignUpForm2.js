/* Sign up form obtained from https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial */

import React, { Component, useRef } from 'react'
import './SignUpForm.css'
import Loading from '../Loading/Loading.js'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm, Controller } from 'react-hook-form'

export default function App() {
    const { register, handleSubmit, control, watch, errors } = useForm();
    const notify = useRef(false);
    const latitude = useRef(0.0);
    const longitude = useRef(0.0);

    const onSubmit = event => {
        console.log(event);
        // const { email, passwordOne, name, phone, notify, latitude, longitude } = this.state;

        // this.props.firebase
        //     .createUser(email, passwordOne, name, phone, notify, notify, latitude, longitude)
        //     .then(authUser => {
        //         this.toggleWait()
        //     })
        //     .catch(error => {
        //         this.toggleWait()
        //     });
     
        // event.preventDefault();
    };
  
    const toggleNotify = () => {
        console.log("TEST");
        notify.current = !notify.current
    };

    const getLocation = () => {
        if (window.navigator.geolocation) {
            window.navigator.geolocation
                .getCurrentPosition((location) => {
                    console.log(location);
                    latitude.current = location.coords.latitude;
                    longitude.current = location.coords.longitude;
                }, console.log);
        }
    };

    //console.log(watch("name")); // watch input value by passing the name of it
  
    return (
        <div>
            <form className="login-form input-group" onSubmit={handleSubmit(onSubmit)}>
                <input
                    className="input-group-text"
                    name="name"
                    type="text"
                    placeholder="First Name"
                    ref={register({required: true})}
                />
                <input
                    className="input-group-text"
                    name="email"
                    type="text"
                    placeholder="Email Address"
                    ref={register({required: true})}
                />
                <input
                    className="input-group-text"
                    name="passwordOne"
                    type="password"
                    placeholder="Password"
                    ref={register({required: true, })}
                />
                <input
                    className="input-group-text"
                    name="passwordTwo"
                    type="password"
                    placeholder="Confirm Password"
                    ref={register({required: true})}
                />
                <div className="permission-container" name="permissionContainer">
                    <input
                        className="input-group-check"
                        name="notify"
                        value={notify.current}
                        onChange={toggleNotify}
                        type="checkbox"
                        placeholder="Sign up for ISS location notifications"
                    />
                    <div className="permission-text" name="permissionText">
                        I want to know when the ISS flies over my location!
                    </div>
                </div>
                {
                    notify.current && (
                        <div className="extra-fields-container" name="extraFieldsContainer">
                            <div className="btn-container" name="buttonContainer">
                                <button className="btn btn-light" disabled={!notify} type="button" name="locationButton" onClick={getLocation}>
                                    Share Location
                                </button>
                            </div>
                            <div className="lat-long-container" name="latLongContainer">
                                <input
                                    className="input-group-text"
                                    name="latitude"
                                    type="text"
                                    value={latitude.current}
                                    placeholder="Latitude"
                                    disabled={true}
                                    ref={register({required: notify.current})}
                                />
                                {errors.exampleRequired && <span>This field is required</span>}
                                <input
                                    className="input-group-text"
                                    name="longitude"
                                    type="text"
                                    value={longitude.current}
                                    placeholder="Longitude"
                                    disabled={true}
                                    ref={register({required: notify.current})}
                                />
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>
                        </div>
                    )
                }
                {
                    notify.current && (
                        <div className="phone-input-container" name="phoneInputContainer">
                            <Controller
                                as={<PhoneInput
                                    country={'us'}
                                    onlyCountries={['us']}
                                />}
                                name="phone"
                                control={control}
                                defaultValue=""
                            />
                        </div>
                    )
                }
                <div className="btn-container" name="buttonContainerTwo">
                    <button className="btn btn-signin" type="submit" name="submitButton">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    );
  }