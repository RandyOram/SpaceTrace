import React, { Component } from 'react'
import './LiveFeed.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'

class LiveFeed extends Component {

    constructor() {
        super();
        
        this.state = {
            feedVisible: false
        };

        this.toggleFeed = this.toggleFeed.bind(this);
    }

    toggleFeed() {
        this.setState({ feedVisible: !this.state.feedVisible });
    }

    render() {
        const feedVisible = this.state.feedVisible;
        return (
            <div className="liveFeedPosition col-xs-12 col-md-6 embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item liveFeedStyle" src="https://ustream.tv/embed/9408562?autoplay=1" scrolling="no" frameBorder="0" background="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
                {/* <iframe className="embed-responsive-item liveFeedStyle" src="https://www.youtube.com/embed/u5QavktMPOg?controls=0&autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            </div>
        )
    } 
}

export default LiveFeed;