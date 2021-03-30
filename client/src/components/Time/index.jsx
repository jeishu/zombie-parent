import React from "react";
import Moment from "react-moment";
import "./time.scss";

const Time = () => {
    return (
        <Moment format="h:mm a" local interval={1} className="time"/>
    )
}

export default Time;
