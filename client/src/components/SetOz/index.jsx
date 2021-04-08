import React from "react";

const SetOz = (props) => {
  return (
    <form action="submit">
      <input
        type="number"
        id="oz"
        style={{ display: props.showOz }}
        name="oz"
        required
      />
      <input
        id="oz"
        style={{ display: props.showOz }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.handleEatSubmit(
            "Stop",
            { left: false, right: false },
            "bottle",
            document.getElementById("oz").value
          );
        }}
      />
    </form>
  );
};

export default SetOz;
