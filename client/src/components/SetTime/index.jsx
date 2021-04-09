import React from "react";
import "./setTime.scss";

const SetTime = (props) => {
  return (
    <form action="submit" className="set-time-form">
      <input
        type="datetime-local"
        id="log"
        style={{ display: props.showHide }}
        name="log"
        min="00:00"
        max="23:59"
        required
        className="set-time-input"
      />
      <input
        id="setTime"
        style={{ display: props.showHide }}
        type="submit"
        onClick={(e) => props.setTimeSubmit(e, document.getElementById("log").value)}
        className="set-time-submit"
      />
    </form>
  );
};

export default SetTime;
