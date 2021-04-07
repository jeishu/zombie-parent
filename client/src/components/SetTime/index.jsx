import React from "react";

const SetTime = (props) => {
  return (
    <form action="submit">
      <input
        type="datetime-local"
        id="log"
        style={{ display: props.showHide }}
        name="log"
        min="00:00"
        max="23:59"
        required
      />
      <input
        id="setTime"
        style={{ display: props.showHide }}
        type="submit"
        onClick={(e) => props.setTimeSubmit(e, document.getElementById("log").value)}
      />
    </form>
  );
};

export default SetTime;
