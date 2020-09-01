/* Sign up form obtained from https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial */

import React, { Component, useRef, useState } from 'react'
import './SignUpForm.css'
import Loading from '../Loading/Loading.js'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm, Controller } from 'react-hook-form'

export default function SignInForm2(props) {
    const { register, handleSubmit, control, watch, errors } = useForm();
    const watchPasswordOne = watch("passwordOne", false);
    const [notify, setNotify] = useState(false);
    const [submitWait, setSubmitWait] = useState(false);
    const [locWait, setLocWait] = useState(false);
    const [latitude, setLatitude] = useState(0.0);
    const [longitude, setLongitude] = useState(0.0);
    const [submitErrorExists, setSubmitErrorExists] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const onSubmit = event => {
        setSubmitErrorExists(false);
        setSubmitWait(true);
        props.firebase
            .createUser(event.email, event.passwordOne, event.name, event.phone, notify, latitude, longitude)
            .catch(error => {
                setSubmitError(error.message);
                setSubmitErrorExists(true);
                console.log(error.message);
            })
            .finally(() => {
                setSubmitWait(false);
            })
    };
  
    const toggleNotify = () => {
        setNotify(!notify)
    };

    const getLocation = () => {
        setLocWait(true);
        if (window.navigator.geolocation) {
            window.navigator.geolocation
                .getCurrentPosition((location) => {
                    console.log(location);
                    setLocWait(false);
                    setLatitude(location.coords.latitude);
                    setLongitude(location.coords.longitude);
                }, console.log);
        }
    };
  
    return (
        <div>
            {
                (!submitWait && 
                    <form className="login-form input-group" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            className={`input-group-text form-control ${errors.name && 'is-invalid'}`}
                            name="name"
                            type="text"
                            placeholder="Name"
                            aria-invalid={errors.name ? "true" : "false"}
                            ref={register({required: true})}
                        />
                        {(errors.name && errors.name.type === "required" && <div className="full-width center-relative"><span className="error-text">Please enter your name</span></div>)}
                        <input
                            className={`input-group-text form-control ${errors.email && 'is-invalid'}`}
                            name="email"
                            type="text"
                            placeholder="Email Address"
                            ref={register({required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
                        />
                        {(errors.email && errors.email.type === "required" && <div className="full-width center-relative"><span className="error-text">Please enter an email address</span></div>)}
                        {(errors.email && errors.email.type === "pattern" && <div className="full-width center-relative"><span className="error-text">Improperly formatted email address</span></div>)}
                        <input
                            className={`input-group-text form-control ${errors.passwordOne && 'is-invalid'}`}
                            name="passwordOne"
                            type="password"
                            placeholder="Password"
                            ref={register({required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/})}
                        />
                        {(errors.passwordOne && errors.passwordOne.type === "required" && <div className="full-width center-relative"><span className="error-text">Please enter a password</span></div>)}
                        <input
                            className={`input-group-text form-control ${errors.passwordTwo && 'is-invalid'}`}
                            name="passwordTwo"
                            type="password"
                            placeholder="Confirm Password"
                            ref={register({required: true, validate: value => value === watchPasswordOne, pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/})}
                        />
                        {(errors.passwordTwo && errors.passwordTwo.type === "required" && <div className="full-width center-relative"><span className="error-text">Please confirm your password</span></div>)}
                        {(errors.passwordTwo && errors.passwordTwo.type === "validate" && <div className="full-width center-relative"><span className="error-text">Passwords do not match</span></div>)}
                        <div className="full-width center-relative requirements-container">
                            <span className={`requirements-text ${errors.passwordOne && errors.passwordOne.type === "pattern" && 'requirements-text-error'}`}>
                                Your password must be at least 8 characters long and contain one letter, one number, and one special character.
                            </span>
                        </div>
                        <div className="permission-container" name="permissionContainer">
                            <input
                                className="input-group-check"
                                name="notify"
                                value={notify}
                                onChange={toggleNotify}
                                type="checkbox"
                                placeholder="Sign up for ISS location notifications"
                            />
                            <div className="permission-text" name="permissionText">
                                I want to know when the ISS flies over my location!
                            </div>
                        </div>
                        {
                            notify && (
                                <div className="full-width">
                                    <div className="extra-fields-container" name="extraFieldsContainer">
                                        <div className="btn-container" name="buttonContainer">
                                            {
                                                !locWait && (
                                                    <button className="btn btn-light" disabled={!notify} type="button" name="locationButton" onClick={getLocation}>
                                                        Share Location
                                                    </button>
                                                )
                                            }
                                            {
                                                locWait && (
                                                    <div>
                                                        <Loading />
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="lat-long-container" name="latLongContainer">
                                            <input
                                                className={`input-group-text form-control ${errors.name && 'is-invalid'}`}
                                                name="latitude"
                                                type="text"
                                                value={latitude}
                                                placeholder="Latitude"
                                                disabled={true}
                                                ref={register({required: notify, validate: value => value != 0.0})}
                                            />
                                            <input
                                                className={`input-group-text form-control ${errors.name && 'is-invalid'}`}
                                                name="longitude"
                                                type="text"
                                                value={longitude}
                                                placeholder="Longitude"
                                                disabled={true}
                                                ref={register({required: notify, validate: value => value != 0.0})}
                                            />
                                        </div>
                                        {(
                                            ((errors.latitude && errors.latitude.type === "validate") && (errors.longitude && errors.longitude.type === "validate")) && 
                                            <div className="full-width center-relative">
                                                <span className="error-text error-location">Please press "share location"</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }
                        {
                            notify && (
                                <div className="wrapper">
                                    <div className="phone-input-container" name="phoneInputContainer">
                                        <Controller
                                            as={<PhoneInput
                                                country={'us'}
                                                onlyCountries={['us']}
                                            />}
                                            name="phone"
                                            control={control}
                                            defaultValue=""
                                            rules={{required: notify, pattern: /^[0-9]{11}$/}}
                                        />
                                    </div>
                                    {(errors.phone && errors.phone.type === "required" && <div className="full-width center-relative"><span className="error-text">Please enter your phone number</span></div>)}
                                    {(errors.phone && errors.phone.type === "pattern" && <div className="full-width center-relative"><span className="error-text">Invalid phone number</span></div>)}
                                </div>
                            )
                        }
                        <div className="btn-container" name="buttonContainerTwo">
                            <button className="btn btn-signin" type="submit" name="submitButton">
                                Sign Up
                            </button>
                        </div>
                        {(submitErrorExists && <div className="full-width center-relative center-text"><span className="error-text">{submitError}</span></div>)}
                    </form>
                )
            }
            {
                submitWait && (
                    <div className="center">
                        <Loading />
                    </div>
                )
            }
        </div>
    );
  }