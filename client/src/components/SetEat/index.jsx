import React from "react";

const SetEat = (props) => {
  return (
    <form action="submit">
      <input
        type="number"
        id="addOz"
        style={{ display: props.showAddOz }}
        name="addOz"
      />
      <input
        type="datetime-local"
        id="startEat"
        style={{ display: props.showEat }}
        name="startEat"
        required
      />
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
