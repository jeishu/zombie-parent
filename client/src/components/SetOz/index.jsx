import React from "react";
import "./setOz.scss";

const SetOz = (props) => {
  return (
    <form action="submit" className="set-Oz-form" style={{ display: props.showOz }}>
      <input
        type="number"
        id="oz"
        style={{ display: props.showOz }}
        name="oz"
        required
      />
      <input
        id="ozSubmit"
        style={{ display: props.showOz }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.returnToLog();
          props.handleEatSubmit(
            "Stop",
            { left: false, right: false },
            "bottle",
            "",
            "",
            document.getElementById("oz").value
          );
        }}
      />
    </form>
  );
};

export default SetOz;
