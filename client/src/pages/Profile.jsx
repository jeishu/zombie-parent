import React, { useState } from "react";
import jsonData from "../tempData.json";
import DatePicker from "react-date-picker";

export default function Profile() {
  const [dobValue, dobOnChange] = useState(new Date());
  const [nameValue, nameOnChange] = useState();

  const children = jsonData.children;

  return (
    <main>
      <h1>Profile Page</h1>
      <h1>{`${jsonData.user.firstName} ${jsonData.user.lastName}`}</h1>

      {/* add and see children */}
      {/* https://github.com/wojtekmaj/react-date-picker */}
      <div>
        <form action="">
          <label htmlFor="childsName">What is the childs name?</label> <br />
          <input value={nameValue} onChange={nameOnChange} /> <br />
          <label htmlFor="dobCalendar">What is the childs birthday?</label>{" "}
          <br />
          <DatePicker
            onChange={dobOnChange}
            value={dobValue}
            id="dobCalendar"
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            calendarIcon={null}
            clearIcon={null}
          />{" "}
          <br />
          <input type="submit" value="Add a new child" />
        </form>
        <ul>
          {children.map((child) => {
            return <li style={{ listStyleType: "none" }}>{child.name}</li>;
          })}
        </ul>
      </div>
    </main>
  );
}
