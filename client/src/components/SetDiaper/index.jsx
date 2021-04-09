import React from "react";
import "./setTime.scss";

const SetDiaper = (props) => {
  return (
    <form action="submit" className="set-time-form">
      <input
        type="datetime-local"
        id="diaper"
        style={{ display: props.showDiaper }}
        name="diaper"
        min="00:00"
        max="23:59"
        required
        className="set-time-input"
      />
      <input
        id="submitDiaper"
        style={{ display: props.showDiaper }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.returnToLog();
          props.setDiaperSubmit(document.getElementById("diaper").value);
        }}
        className="set-time-submit"
      />
    </form>
  );
};

export default SetDiaper;
