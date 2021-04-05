import React from "react";

const SetTime = (props) => {
  return (
    <form action="submit">
      <input type="time" id="log" name="log" min="00:00" max="23:59" required />
      <input type="submit" onClick={props.handleDiaperSetTimeSubmit} />
    </form>
  );
};

export default SetTime;
