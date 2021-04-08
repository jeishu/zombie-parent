import React, { useState, useEffect } from "react";
import jsonData from "../tempData.json";
import DatePicker from "react-date-picker";
import moment from "moment";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import "../pages/profile.scss";
import Fire from "../Fire";
import { initUser, setUser, loginChecklist } from "../utils/loginFunctions";
import { set } from "mongoose";

export default function Profile() {
  const [dobValue, setDobValue] = useState(new Date());
  const [nameValue, setNameValue] = useState("");
  const [state, dispatch] = useStoreContext();
  const children = jsonData.children;
  const [userEmail, setUserEmail] = useState("email");

  // create function that takes in name and birthdate.

  useEffect(() => {
    let Im = Fire.auth().currentUser;
    console.log(Im.uid);
    let userCredential = { user: { uid: Im.uid } };

    initUser(userCredential, dispatch);
    // loginChecklist(state, dispatch);
  }, []);

  function handleCreateChild(e) {
    // console.log(dobValue, nameValue);
    e.preventDefault();
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
      });
      const updatedUser = {
        ...state.user,
        child: [...state.user.child, childReturn.data._id],
        activeChild: [...state.user.child, childReturn.data._id],
        lastViewedChild: childReturn.data._id,
      };
      console.log(JSON.stringify(updatedUser, null, 2));
      API.updateUser(state.user._id, updatedUser).then((userReturn) => {
        console.log("userReturn is" + JSON.stringify(userReturn));
        dispatch({
          type: "setUser",
          user: userReturn.data,
        });
        setDobValue("");
        setNameValue("");
        console.log(state.user.lastViewedChild);
      });
    });
  }

  return (
    <main className="page">
      <h2>{state.loading === false ? state.user.email : "...loading"}</h2>

      {/* add and see children */}
      {/* https://github.com/wojtekmaj/react-date-picker */}
      <div>
        <form action="">
          <label htmlFor="childsName">What is the childs name?</label> <br />
          <input
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
          />
          <br />
          <label htmlFor="dobCalendar">What is the childs birthday?</label>{" "}
          <br />
          {/* <DatePicker
            onChange={(e) => setDobValue(e.target.value)}
            value={dobValue}
            id="aaaa"
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            calendarIcon={null}
            clearIcon={null}
          />{" "} */}
          <label htmlFor="start">Start date:</label>
          <input
            type="date"
            id="dobCalendar"
            name="Date of Birth"
            value={dobValue}
            onChange={(e) => setDobValue(e.target.value)}
            // onClick={(e) => props.setTimeSubmit(e, document.getElementById("NAME_HERE").value)}
            // min="2018-01-01"
            // max="2018-12-31"
          ></input>
          <br />
          <input
            onClick={(e) => handleCreateChild(e)}
            type="submit"
            value="Add a new child"
          />
        </form>
      </div>

      <ul>
        {state.loading === false
          ? state.user.child.map((child) => {
              return (
                <li key={child._id} style={{ listStyleType: "none" }}>
                  {child.name}
                </li>
              );
            })
          : "loading"}
      </ul>

      <button onClick={() => console.log(state)}>State</button>
      {/* <div>
        <h2>children</h2>
        <ul>
          

          {!state.loading && state?.user.child ? state.user.child.map((child) => {
            return <li key={child.name} style={{ listStyleType: "none" }}>{child.name}</li>;
          }) : "add a child to see a list"}
        </ul>
        
      </div> */}
      {/* <div><h2>{state.loading === false ? state.child.name : "...loading"}</h2></div> */}
    </main>
  );
}
