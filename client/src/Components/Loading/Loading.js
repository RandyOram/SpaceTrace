import React, { Component } from "react";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import ReactLoading from "react-loading";

class Loading extends Component {
    constructor(props){
       super(props)
    }

    render() {
        return (
            <div>
                <ReactLoading type={"bars"} color={"white"} />
            </div>
        )
    }
}

export default Loading