import React from "react";
import "./setEat.scss";

const SetEat = (props) => {
  return (
    <form action="submit" style={{ display: props.showAddOz }} className="set-eat-form">
      <label htmlFor="addOz" style={{ display: props.showAddOz }}>How many ounces?</label>
      <input
        type="number"
        id="addOz"
        style={{ display: props.showAddOz }}
        name="addOz"
      />
      <label htmlFor="startEat" style={{ display: props.showAddOz }}>Start Time?</label>
      <input
        type="datetime-local"
        id="startEat"
        style={{ display: props.showEat }}
        name="startEat"
        required
      />
      <label htmlFor="stopEat" style={{ display: props.showAddOz }}>End Times?</label>
      <input
        type="datetime-local"
        id="stopEat"
        style={{ display: props.showEat }}
        name="stopEat"
        required
      />
      <input
        id="nap"
        style={{ display: props.showEat }}
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          props.returnToLog();
          props.handleEatSubmit(
            "Add",
            props.addEatMethod,
            props.addEatAction,
            document.getElementById("startEat").value,
            document.getElementById("stopEat").value,
            document.getElementById("addOz").value
          );
        }}
      />
    </form>
  );
};

export default SetEat;
