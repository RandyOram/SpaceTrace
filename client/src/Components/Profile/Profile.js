import React, { Component } from 'react'

const INITIAL_STATE = {
    username: '',
    email: '',
    error: null,
    waiting: false
};

class Profile extends Component {
    constructor() {
        super(props)
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
    
    render() {
        return (

        )
    }
}

export default Profile