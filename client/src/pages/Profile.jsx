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
  const [dobValue, dobOnChange] = useState(new Date());
  const [nameValue, nameOnChange] = useState("");
  const [state, dispatch] = useStoreContext();
  const children = jsonData.children;

  // create function that takes in name and birthdate.

  useEffect(() => {
    let Im = Fire.auth().currentUser;
    console.log(Im.uid);
    let userCredential = { user: { uid: Im.uid } };
    
    initUser(userCredential, dispatch);
    console.log(JSON.stringify(state, null, 2));


    // initUser(userCredential).then((data) => {
    //   console.log(data);
    //   // setUser(data, dispatch)
    // })
    // let userData;
    // let startup = async () => {
    //   console.log("ping");
    //   try {
    //     userData = await initUser(userCredential);
    //     // return userData;
    //   } catch (err) {
    //     console.error(err);
    //   }
    //   console.log("initUser userData = " + JSON.stringify(userData, null, 2));
    //   return userData;
    // };
    
    // // setUser(userData, dispatch).then(loginChecklist(state, dispatch));
    // startup();
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
      API.updateUser(updatedUser).then((userReturn) => {
        console.log("userReturn is" + JSON.stringify(userReturn));
        dispatch({
          type: "setUser",
          user: userReturn.data,
        });
        dobOnChange("");
        nameOnChange("");
        console.log(state.user.lastViewedChild);
      });
    });
  }

  return (
    <main className="page">
      <h1>Profile Page</h1>
      <h2>{state.user.uid ? "state.user": "username" }</h2>

      {/* add and see children */}
      {/* https://github.com/wojtekmaj/react-date-picker */}
      <div>
        <form action="">
          <label htmlFor="childsName">What is the childs name?</label> <br />
          <input
            value={nameValue}
            onChange={(e) => nameOnChange(e.target.value)}
          />
          <br />
          <label htmlFor="dobCalendar">What is the childs birthday?</label>{" "}
          <br />
          {/* <DatePicker
            onChange={(e) => dobOnChange(e.target.value)}
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
            onChange={(e) => dobOnChange(e.target.value)}
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
        <p> {JSON.stringify(state)} </p>
      </div>
    </main>
  );
}


