import React from "react";

const SetNap = (props) => {
  return (
    <form action="submit">
      <input
        type="datetime-local"
        id="startNap"
        style={{ display: props.showNap }}
        name="startNap"
        required
      />
      <input
        type="datetime-local"
        id="stopNap"
        style={{ display: props.showNap }}
        name="stopNap"
        required
      />
      <input
        id="nap"
        style={{ display: props.showNap }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.handleNapSubmit(
            "Add",
            document.getElementById("startNap").value,
            document.getElementById("stopNap").value
          );
        }}
      />
    </form>
  );
};

export default SetNap;