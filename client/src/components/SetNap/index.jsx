import React from "react";
import "./setNap.scss";

const SetNap = (props) => {
  return (
    <form action="submit" className="set-nap-form" style={{ display: props.showNap }}>
      <div className="set-nap-label">
        <label htmlFor="startNap" style={{ display: props.showNap }}>Start</label>
        <input
          type="datetime-local"
          id="startNap"
          style={{ display: props.showNap }}
          name="startNap"
          required
        />
      </div>
      <div className="set-nap-label">
        <label htmlFor="stopNap" style={{ display: props.showNap }}>End</label>
        <input
          type="datetime-local"
          id="stopNap"
          style={{ display: props.showNap }}
          name="stopNap"
          required
        />
      </div>
      <input
        className="set-nap-submit"
        id="nap"
        style={{ display: props.showNap }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.returnToLog();
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