import React, { useState, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import API from "../utils/API";
import "./log.scss"; // styling
import moment from "moment"; // for logging time
import Fire from "../Fire";
import { initUser } from "../utils/loginFunctions";

// components
import SetOz from "../components/SetOz";
import SetDiaper from "../components/SetDiaper";
import Hierarchy from "../components/Hierarchy";
import LogBtn from "../components/LogBtn";
import SetNap from "../components/SetNap";
import SetEat from "../components/SetEat";

export default function Log() {
  const [currentChild, setCurrentChild] = useState("Log");
  
  // allows dynamically renered buttons and directory
  const [btn1, setBtn1] = useState({ name: "Diaper", btn: "Diaper" });
  const [btn2, setBtn2] = useState({ name: "Eat", btn: "Eat" });
  const [btn3, setBtn3] = useState({ name: "Nap", btn: "Nap" });
  const [dir, setDir] = useState([{ name: currentChild, btn: "Default", key: 0 }]);

  const [state, dispatch] = useStoreContext();

  // allows dynamicly accessable buttons
  const [showDiaper, setShowDiaper] = useState("none");
  const [showOz, setShowOz] = useState("none");
  const [showNap, setShowNap] = useState("none");
  const [showEat, setShowEat] = useState("none");
  const [showAddOz, setShowAddOz] = useState("none");

  const [addEatMethod, setAddEatMethod] = useState({});
  const [addEatAction, setAddEatAction] = useState("");

  useEffect(() => {
    let Im = Fire.auth().currentUser;
    console.log(Im.uid);
    let userCredential = { user: { uid: Im.uid } };

    initUser(userCredential, dispatch).then( // fix this at some point
      state.loading === false ? setCurrentChild(state.child.name) : "Log" 
    );
  }, []);

  const updateButtons = (choice, name, key) => {
    // main button update function
    whichActions(choice); // when buttons lead to actions, this is where that is decided
    addDir(choice, name, key); // updates hierarchy array

    switch (choice) { // updates what renders on buttons, and what their next action is called
      case "Default": // catch everything that leads back to default view
      case "Add Now":
      case "End Time":
      case "Stop Time":
      case "Stop Feed":
        setBtns("Diaper", "Eat", "Nap", "Diaper", "Eat", "Nap");
        setDir([{ name: currentChild, btn: "Default", key: 0 }]); // everytime we return to default, reset the hierarchy
        setShowDiaper("none")
        break;
      case "Diaper":
        setBtns("Pee", "Poo", "Both", "now/set", "now/set", "now/set");
        break;
      case "Eat":
        setBtns("Nurse", "Bottle", "Add Time", "Nurse", "Bottle", "Add Eat");
        break;
      case "Nap":
        setBtns("Start", "End", "Add Time", "Start Time", "End Time", "Add Nap");
        break;
      case "Nurse":
        setBtns("Left", "Right", "Cancel", "Feed", "Feed", "Default");
        break;
      case "Feed":
        setBtns("Start", "Stop", "Switch", "Start Feed", "Stop Feed", "Nurse");
        break;
      case "Bottle":
        setBtns("Start", "Stop/Oz", "Cancel", "Start Bottle", "Stop Bottle", "Default");
        break;
      case "now/set":
        setBtns( "Add Now", "Set Time", "Cancel", "Add Now", "Set Time", "Default");
        break;
      case "Add Eat":
        setBtns("Add Left", "Add Right", "Add Bottle", "Add Left", "Add Right", "Add Bottle")
        break;
      default:
        console.log("This action does not update the buttons"); // remove this from final build
        break;
    }
  };

  const whichActions = (choice) => {
    // when buttons need to call funtions this triggers the functions
    const lastDir = dir[dir.length - 1].name; // find the last item in the directory array

    if (choice === "Add Now" && lastDir === "Pee") {
      handleDiaperAddNowSubmit({ pee: true });
    } else if (choice === "Add Now" && lastDir === "Poo") {
      handleDiaperAddNowSubmit({ poo: true });
    } else if (choice === "Add Now" && lastDir === "Both") {
      handleDiaperAddNowSubmit({ pee: true, poo: true });
    } else if (choice === "Set Time") {
      setShowDiaper("block");
    } else if (choice === "Start Feed" && lastDir === "Left") {
      handleEatSubmit("Start", { left: true, right: false }, "nurse", "", "", null);
    } else if (choice === "Start Feed" && lastDir === "Right") {
      handleEatSubmit("Start", { left: false, right: true }, "nurse", "", "", null);
    } else if (choice === "Start Bottle" && lastDir === "Bottle") {
      handleEatSubmit("Start", { left: false, right: false }, "bottle", "", "", null);
    } else if (choice === "Stop Feed" && lastDir === "Left") {
      handleEatSubmit("Stop", { left: true, right: false }, "nurse", "", "", null);
    } else if (choice === "Stop Feed" && lastDir === "Right") {
      handleEatSubmit("Stop", { left: false, right: true }, "nurse", "", "", null);
    } else if (choice === "Stop Bottle" && lastDir === "Bottle") {
      setShowOz("block");
    } else if (choice === "Start Time" && lastDir === "Nap") {
      handleNapSubmit("Start");
    } else if (choice === "End Time" && lastDir === "Nap") {
      handleNapSubmit("Stop");
    } else if (choice === "Add Nap") {
      setShowNap("block");
    } else if (choice === "Add Left") {
      setShowEat("block");
      setAddEatMethod({ left: true, right: false });
      setAddEatAction("nurse");
    } else if (choice === "Add Right") {
      setShowEat("block");
      setAddEatMethod({ left: false, right: true });
      setAddEatAction("nurse");
    } else if (choice === "Add Bottle") {
      setShowAddOz("block");
      setShowEat("block");
      setAddEatMethod({ left: false, right: false });
      setAddEatAction("bottle");
    }
  };

  // sets the hierarchy back when the user clicks an item in the array
  const dirTree = async (clickedDir) => {
    let tempDir = dir;
    let slicedDir = tempDir.slice(0, clickedDir.key);
    setDir(slicedDir);
  };

  // adds to the hierarchy when the user clicks a button
  const addDir = (btnChoice, btnName, btnKey) => {
    let dirLengthLessOne = dir.length - 1; // key of last item in array

    if (btnName === "Switch") {
      // backs the user up when switching nursing sides
      setDir(dir.filter((e) => e.key !== dirLengthLessOne));
    } else if (
      // lists buttons that should not be added to hierarchy
      btnName !== "Switch" &&
      btnName !== "Start" &&
      btnName !== "Oz" &&
      btnName !== "Start Time" &&
      btnName !== "Set Time" &&
      btnName !== "Start Left" &&
      btnName !== "Start Right" &&
      btnName !== "Stop" &&
      btnChoice !== "Add Nap" &&
      btnChoice !== "Add Left" &&
      btnChoice !== "Add Right" &&
      btnChoice !== "Add Bottle" &&
      btnName !== dir[dirLengthLessOne].name
    ) {
      setDir((dir) => [
        ...dir,
        { name: btnName, btn: btnChoice, key: btnKey + 1 },
      ]); // sets new item in hierarchy and makes key === to its position in the array
    }
  };

  // sets the buttons name and actions
  const setBtns = (name1, name2, name3, button1, button2, button3) => {
    setBtn1({ name: name1, btn: button1 });
    setBtn2({ name: name2, btn: button2 });
    setBtn3({ name: name3, btn: button3 });
  };

  // when adding diaper time this chooses what function to run and adds the proper values
  function setDiaperSubmit(time) {
    const lastDir = dir[dir.length - 1].name; // find the last item in the directory array
    if (lastDir === "Pee") {
      handleDiaperSetTimeSubmit({ pee: true }, time);
    } else if (lastDir === "Poo") {
      handleDiaperSetTimeSubmit({ poo: true }, time);
    } else if (lastDir === "Both") {
      handleDiaperSetTimeSubmit({ pee: true, poo: true }, time);
    }
  }

  function returnToLog() {
    const lastDir = dir[dir.length - 1].name;
    updateButtons("Default", currentChild, lastDir.key);
  }

  // adds diapers to database when add time is now
  function handleDiaperAddNowSubmit(contents) {
    let actionData = {
      name: "diaper",
      endedByUser: true,
      lastUpdatedBy: { _id: state.user._id },
      child: { _id: state.child._id },
      diaperContents: contents,
    };
    API.createAction(actionData).catch((err) => console.log(err));
  }

  // adds diapers to database when logging past diapers
  function handleDiaperSetTimeSubmit(contents, time) {
    let actionData = {
      name: "diaper",
      beginTime: time,
      endTime: time,
      endedByUser: true,
      lastUpdatedBy: { _id: state.user._id },
      child: { _id: state.child._id },
      diaperContents: contents,
    };
    API.createAction(actionData) // .then(res => loadBooks())
      .catch((err) => console.log(err));
  }

  // adds feeding to database when add time is now
  function handleEatSubmit(whichSubmit, method, actionName, startEat, stopEat, oz) {
    setShowOz("none");
    setShowAddOz("none");
    setShowEat("none");
    let actionData;
    dispatch({
      type: "loading",
    });
    if (whichSubmit === "Start") {
      actionData = {
        name: actionName,
        endTime: "",
        lastUpdatedBy: { _id: state.user._id },
        child: { _id: state.child._id },
        foodOz: oz,
        nurse: method,
      };
      API.createAction(actionData)
        .then((result) => {
          dispatch({
            type: "setFeeding",
            feeding: result.data,
          });
        })
        .catch((err) => {
          dispatch({ name: "endLoading" });
          console.log(err);
        });
    } else if (whichSubmit === "Stop") {
      dispatch({ type: "loading" });
      actionData = {
        ...state.feeding,
        endTime: moment(),
        foodOz: oz,
        endedByUser: true,
        lastUpdatedBy: { _id: state.user._id },
      };
      API.updateAction(state.feeding._id, actionData)
        .then((result) => {
          dispatch({
            type: "setFeeding",
            feeding: {},
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ name: "endLoading" });
        });
    } else if (whichSubmit === "Add") {
      actionData = {
        name: actionName,
        startTime: startEat,
        endTime: stopEat,
        lastUpdatedBy: { _id: state.user._id },
        child: { _id: state.child._id },
        foodOz: oz,
        nurse: method,
      };
      API.createAction(actionData)
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // adds naps to database when add time is now
  function handleNapSubmit(whichSubmit, sleepStart, sleepEnd) {
    setShowNap("none");
    let actionData;
    if (whichSubmit === "Start") {
      actionData = {
        name: "sleep",
        endTime: "",
        lastUpdatedBy: { _id: state.user._id },
        child: { _id: state.child._id },
        endedByUser: false,
      };
      API.createAction(actionData)
        .then((result) => {
          dispatch({
            type: "setSleep",
            sleep: result.data,
          });
        })
        .catch((err) => {
          dispatch({ name: "endLoading" });
          console.log(err);
        });
    } else if (whichSubmit === "Stop") {
      dispatch({ type: "loading" });
      actionData = {
        ...state.sleep,
        endTime: moment(),
        endedByUser: true,
        lastUpdatedBy: { _id: state.user._id }
      };
      API.updateAction(state.sleep._id, actionData)
        .then(() => {
          dispatch({
            type: "setSleep",
            sleep: {},
          });
        })
        .catch((err) => {
          console.error(err);
          dispatch({ name: "endLoading" });
        });
    } else if (whichSubmit === "Add") {
      actionData = {
        name: "sleep",
        beginTime: sleepStart,
        endTime: sleepEnd,
        lastUpdatedBy: { _id: state.user._id },
        child: { _id: state.child._id },
        endedByUser: true,
      };
      API.createAction(actionData)
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <main className="page">
      <main className="log-main">
        <Hierarchy dir={dir} dirTree={dirTree} updateButtons={updateButtons} />
        <LogBtn
          buttonContent={btn1.name}
          btnAction={() =>
            updateButtons(btn1.btn, btn1.name, dir[dir.length - 1].key)
          }
        />{" "}
        <LogBtn
          buttonContent={btn2.name}
          btnAction={() =>
            updateButtons(btn2.btn, btn2.name, dir[dir.length - 1].key)
          }
        />{" "}
        <LogBtn
          buttonContent={btn3.name}
          btnAction={() =>
            updateButtons(btn3.btn, btn3.name, dir[dir.length - 1].key)
          }
        />{" "}
        <SetDiaper
          setDiaperSubmit={setDiaperSubmit}
          showDiaper={showDiaper}
          returnToLog={returnToLog}
        />
        <SetOz
          handleEatSubmit={handleEatSubmit}
          showOz={showOz}
          returnToLog={returnToLog}
        />
        <SetNap
          handleNapSubmit={handleNapSubmit}
          showNap={showNap}
          returnToLog={returnToLog}
        />
        <SetEat
          handleEatSubmit={handleEatSubmit}
          showEat={showEat}
          showAddOz={showAddOz}
          addEatMethod={addEatMethod}
          addEatAction={addEatAction}
          returnToLog={returnToLog}
        />
      </main>
    </main>
  );
}
