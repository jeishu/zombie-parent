import React, { useState } from "react";
import jsonData from "../tempData.json";
import DatePicker from "react-date-picker";
import moment from "moment";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import "../pages/profile.scss";

export default function Profile() {
  const [dobValue, dobOnChange] = useState(new Date());
  const [nameValue, nameOnChange] = useState();
  const [state, dispatch] = useStoreContext();
  const children = jsonData.children;

  // create function that takes in name and birthdate. 

  function handleCreateChild() {
    let childData;
    dispatch({
      type: "loading"
    });

    API.createUser(state.user)
    .then((result) => {
      dispatch({
        type: "createChild",
        // forgot what you had said
      });
    })

    let newUser = { ...state.user, 
      child: [...state.user.child, res.data._id], 
      activeChild: [...state.user.child, res.data._id], 
      lastViewedChild: res.data._id }
  }





  return (
    <main className="page">
      <h1>Profile Page</h1>
      <h2>{`${jsonData.user.firstName} ${jsonData.user.lastName}`}</h2>

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
