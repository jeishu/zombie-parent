import React, { useState } from "react";
import jsonData from "../tempData.json";
import DatePicker from "react-date-picker";
import moment from "moment";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import "../pages/profile.scss";

export default function Profile() {
  const [dobValue, dobOnChange] = useState(new Date());
  const [nameValue, nameOnChange] = useState("");
  const [state, dispatch] = useStoreContext();
  const children = jsonData.children;

  // create function that takes in name and birthdate.

  function handleCreateChild(res) {
    dispatch({
      type: "loading",
    });
    let childData = {
      name: nameValue,
      birthDate: moment(dobValue),
    };
    API.createChild(childData).then((childReturn) => {
      dispatch({
        type: "setChild",
        child: childReturn.data,
      })
      .then(() => {
        API.updateUser({
          ...state.user,
          child: [...state.user.child, childReturn.data._id],
          activeChild: [...state.user.child, childReturn.data._id],
          lastViewedChild: childReturn.data._id,
        })
        .then((userReturn) => {
          dispatch({
            type: "setUser",
            user: userReturn.data
          }).then(() => {
            dobValue = "";
            nameValue = "";
          })
        })
        .catch((error) => {
          console.error(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    });

    

    
  }

  return (
    <main className="page">
      <h1 className="profile-h1">Profile Page</h1>
      <h2 className="profile-h2">{state ? "username" : `${JSON.stringify(state)}`}</h2>

      {/* add and see children */}
      {/* https://github.com/wojtekmaj/react-date-picker */}
      <div>
        <form action="">
          <label className="profile-label" htmlFor="childsName">What is the childs name?</label> <br />
          <input value={nameValue} onChange={(e)=> nameOnChange(e.target.value)} /><br />
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
            return <li key={child.name} style={{ listStyleType: "none" }}>{child.name}</li>;
          })}
        </ul>
      </div>
    </main>
  );
}
