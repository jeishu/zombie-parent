import React from "react";

const SetNap = (props) => {
  return (
    <form action="submit">
      <input
        type="datetime-local"
        id="startNap"
        // style={{ display: props.showOz }}
        name="startNap"
        required
      />
      <input
        type="datetime-local"
        id="stopNap"
        // style={{ display: props.showOz }}
        name="stopNap"
        required
      />
      <input
        id="nap"
        style={{ display: props.showOz }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.handleNapSubmit(
            document.getElementById("startNap").value,
            document.getElementById("endNap").value
          );
        }}
      />
    </form>
  );
};

export default SetNap;