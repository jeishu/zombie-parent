import React from "react";

export default function Log() {
  return (
    <main>
      <h1>Log Page</h1>
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
        <input
          type="time"
          id="nap-start"
          name="nap-time"
          min="00:00"
          max="23:59"
          required
        />{" "}
        <label htmlFor="nap-start">Start</label> <br />
        <input
          type="time"
          id="nap-finish"
          name="nap-time"
          min="00:00"
          max="23:59"
          required
        />{" "}
        <label htmlFor="nap-finish">Finish</label> <br />
        <button>Nap Time</button>
      </form>
    </main>
  );
}
