import React from "react";
import Moment from "react-moment";
import "./time.scss";

const Time = () => {
    return (
        <div className="time-container">
            <Moment format="h:mm" local interval={1} className="time"/>
            <Moment format="a" local interval={1} className="time pm"/>
        </div>
    )
}

export default Time;