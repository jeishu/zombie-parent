import React, { useState } from "react";
import jsonData from "../tempData.json";
import TimePicker from "react-time-picker";

export default function Log() {
  const [startValue, startOnChange] = useState("14:30");
  const [endValue, endOnChange] = useState("15:30");

  const children = jsonData.children;

  return (
    <main>
      <h1>Log Page</h1>
      {/* make the child selector only visible when more then 1 child is possible */}
      <select>
        {children.map((child) => {
          return <option value={child.name}>{child.name}</option>;
        })}
      </select>
      <form action="">
        <input type="radio" id="liquid" name="diaper" value="liquid" />
        <label htmlFor="liquid">Liquid</label>
        <br />
        <input type="radio" id="solid" name="diaper" value="solid" />
        <label htmlFor="solid">Solid</label>
        <br />
        <input type="radio" id="both" name="diaper" value="both" />
        <label htmlFor="both">Both</label>
        <br />
        <input type="submit" value="Diaper Change" />
      </form>
      <form action="">
        <input type="radio" id="left" name="food" value="left" />
        <label htmlFor="left">Left</label>
        <br />
        <input type="radio" id="right" name="food" value="right" />
        <label htmlFor="right">Right</label>
        <br />
        <input type="radio" id="bottle" name="food" value="bottle" />
        <label htmlFor="bottle">Bottle</label>
        <br />
        <input type="submit" value="Food Time" />
      </form>
      <form action="">
        {/* https://github.com/wojtekmaj/react-time-picker */}
        <TimePicker
          type="time"
          id="nap-start"
          name="nap-time"
          onChange={startOnChange}
          value={startValue}
          clockIcon={null}
          clearIcon={null}
          format="hh:mm a"
          required
        />
        <label htmlFor="nap-start">Start</label> <br />
        <TimePicker
          type="time"
          id="nap-finish"
          name="nap-time"
          onChange={endOnChange}
          value={endValue}
          clockIcon={null}
          clearIcon={null}
          format="hh:mm aa"
          required
        />
        <label htmlFor="nap-finish">Finish</label> <br />
        <input type="submit" value="Nap Time" />
      </form>
    </main>
  );
}
