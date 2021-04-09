import React, { useState, useEffect } from "react";
import jsonData from "../tempData.json";
import moment from "moment";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import "../pages/profile.scss";
import Fire from "../Fire";
import { initUser } from "../utils/loginFunctions";
// import { set } from "mongoose";

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
    <main className="profile-page">
      <h1 className="username">{state.loading === false ? state.user.email : "...loading"}</h1>
      <div className="profile-container">
        <div className="form-container">
          <form action="" className="profile-form">
            <h1 className="profile-h1">Add a Child</h1>
            <label htmlFor="childsName">What is the childs name?</label>
            <input
              value={nameValue}
              name="childsName"
              onChange={(e) => setNameValue(e.target.value)}
              className="profile-input"
              required
            />
            <br />
            <label htmlFor="dobCalendar">What is the childs birthday?</label>{" "}
            <div className="profile-dob">
              <input
                type="date"
                id="dobCalendar"
                name="dobCalendar"
                value={dobValue}
                onChange={(e) => setDobValue(e.target.value)}
                required
              ></input>
              <input
                onClick={(e) => handleCreateChild(e)}
                type="submit"
                value="Add"
              />
            </div>
          </form>
        </div>

        <br />

        <div className="children-list">
          <h1 className="profile-h1">Children List</h1>
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
        </div>
      </div>


      <button onClick={() => console.log(state)}>State</button>
    </main>
  );
}
