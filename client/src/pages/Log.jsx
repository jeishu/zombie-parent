import React, { useState } from "react";
import Hierarchy from "../components/Hierarchy";
import LogBtn from "../components/LogBtn";
import SetTime from "../components/SetTime";
import API from "../utils/API";
import { useStoreContext } from "../utils/GlobalState";
import "./log.scss";

export default function Log() {
  const [btn1, setBtn1] = useState({ name: "Diaper", btn: "Diaper" });
  const [btn2, setBtn2] = useState({ name: "Eat", btn: "Eat" });
  const [btn3, setBtn3] = useState({ name: "Nap", btn: "Nap" });
  const [dir, setDir] = useState([{ name: "Log", btn: "Default", key: 0 }]);
  const [state, dispatch] = useStoreContext();
  const [submitAction, setSubmitAction] = useState("None");
  const [user, setUser] = useState({
    _id: "6064d1b34c03365638292266",
    name: "Mama Testy",
    activeChild: [{ _id: "6064d1b34c03365638292265" }],
    careOptions: {
      showBottle: true,
      showNurse: true,
      showNap: true,
      showDiaper: true,
    },
  });
  const [child, setChild] = useState({
    _id: "6064d1b34c03365638292265",
    name: "Lil Testy",
  });
  const [showHide, setShowHide] = useState("none");

  // useEffect(() => {
  //   dispatch();
  // }, []);

  const updateButtons = (choice, name, key) => {
    const lastDir = dir[dir.length - 1].name;
    // console.log(lastDir.name);

    if (choice === "Add Now" && lastDir === "Pee") {
      handleDiaperAddNowSubmit({ pee: true });
      setSubmitAction("Diaper");
    } else if (choice === "Add Now" && lastDir === "Poo") {
      handleDiaperAddNowSubmit({ poo: true });
      setSubmitAction("Diaper");
    } else if (choice === "Add Now" && lastDir === "Both") {
      handleDiaperAddNowSubmit({ pee: true, poo: true });
      setSubmitAction("Diaper");
    } else if (choice === "Set Time") {
      setShowHide("block");
      setSubmitAction("Diaper");
    } else if (choice === "Start Feed" && lastDir === "Left") {
      handleEatSubmit("Start", "", {left: true, right: false}, null, false);
    } else if (choice === "Start Feed" && lastDir === "Right") {
      handleEatSubmit("Start", "", {left: false, right: true}, null, false);
    } else if (choice === "Stop Feed" && lastDir === "Left") {

    } else if (choice === "Stop Feed" && lastDir === "Right") {

    }

    addDir(choice, name, key);

    switch (choice) {
      case "Default":
      case "Add Now":
      case "End Time":
      // case "Set Time":
      case "Stop Time":
        setBtns("Diaper", "Eat", "Nap", "Diaper", "Eat", "Nap");
        setDir([{ name: "Log", btn: "Default", key: 0 }]);
        setShowHide("none")
        break;
      case "Diaper":
        setBtns("Pee", "Poo", "Both", "now/set", "now/set", "now/set");
        break;
      case "Eat":
        setBtns("Nurse", "Bottle", "Cancel", "Nurse", "Bottle", "Default");
        break;
      case "Nap":
        setBtns("Start", "End", "Add Time","Start Time", "End Time", "Add Time");
        break;
      case "Nurse":
        setBtns("Left", "Right", "Add Time", "Feed", "Feed", "Add Nurse");
        break;
      case "Feed":
        setBtns("Start", "Stop", "Switch", "Start Feed", "End Feed", "Nurse");
        break;
      case "Bottle":
        setBtns("Start", "Stop/Oz", "Add Time", "Start Time", "Stop Time", "Add Bottle");
        break;
      case "now/set":
        setBtns( "Add Now", "Set Time", "Cancel", "Add Now", "Set Time", "Default");
        break;
      case "Add Time":
        setBtns( "Start Time", "End Time", "Cancel", "Start Time", "End Time", "Default");
        break;
      case "Add Nurse":
        setBtns( "Start Left", "Start Right", "Stop", "Start Left", "Start Right", "End Time");
        break;
      case "Add Bottle":
        setBtns( "Oz", "Start Time", "Stop Time", "Oz", "Start Time", "Stop Time");
        break;
      default:
        console.log("This action does not update the buttons");
        break;
    }
  };

  const dirTree = async (clickedDir) => {
    let tempDir = dir;
    console.log(tempDir);
    let slicedDir = tempDir.slice(0, clickedDir.key);
    setDir(slicedDir);
  };

  const addDir = (btnChoice, btnName, btnKey) => {
    let dirLengthLessOne = dir.length - 1;

    if (btnName === "Switch") {
      setDir(dir.filter((e) => e.key !== dirLengthLessOne));
    } else if (
      btnName !== "Switch" &&
      btnName !== "Start" &&
      btnName !== "Oz" &&
      btnName !== "Start Time" &&
      btnName !== "Set Time" &&
      btnName !== "Start Left" &&
      btnName !== "Start Right" &&
      btnName !== dir[dirLengthLessOne].name
    ) {
      setDir((dir) => [
        ...dir,
        { name: btnName, btn: btnChoice, key: btnKey + 1 },
      ]);
    }
  };

  const setBtns = (name1, name2, name3, button1, button2, button3) => {
    setBtn1({ name: name1, btn: button1 });
    setBtn2({ name: name2, btn: button2 });
    setBtn3({ name: name3, btn: button3 });
  };

  function setTimeSubmit(event, time) {
    event.preventDefault();
    const lastDir = dir[dir.length - 1].name;
    // if (submitAction != "Diaper") {
    //   setShowHide("none");
    // }
    updateButtons("Default", "Log", lastDir.key);
    if (lastDir === "Pee") {
      handleDiaperSetTimeSubmit({ pee: true }, time);
    } else if (lastDir === "Poo") {
      handleDiaperSetTimeSubmit({ poo: true }, time);
    } else if (lastDir === "Both") {
      handleDiaperSetTimeSubmit({ pee: true, poo: true }, time);
    } 
  }

  function handleDiaperAddNowSubmit(contents) {
    console.log("addNowDiaper");
    console.log(contents);
    let actionData = {
      name: "diaper",
      endedByUser: true,
      lastUpdatedBy: { _id: user._id },
      child: { _id: child._id },
      diaperContents: contents,
    };
    API.createAction(actionData) // .then(res => loadBooks())
      .catch((err) => console.log(err));
  }

  function handleDiaperSetTimeSubmit(contents, time) {
    console.log("setTimeDiaper");
    console.log(contents);
    let actionData = {
      name: "diaper",
      beginTime: time,
      endTime: time,
      endedByUser: true,
      lastUpdatedBy: { _id: user._id },
      child: { _id: child._id },
      diaperContents: contents,
    };
    API.createAction(actionData) // .then(res => loadBooks())
      .catch((err) => console.log(err));
  }

  function handleEatSubmit(timeStart, timeStop, method, oz, ended) {
    let actionData;
    if (timeStart === "Start") {
      actionData = {
        name: user.name,
        // beginTime: timeStart,
        endTime: "",
        lastUpdatedBy: { _id: user._id },
        child: { _id: child._id },
        foodOz: oz,
        whichBreast: {
          method,
        },
        endedByUser: ended,
      };
    }

    API.createAction(actionData).catch((err) => console.log(err));
  }

  // function handleNapSubmit(contents) {
  //   let actionData = {
  //     name: user.name,
  //     beginTime: "",
  //     endTime: "",
  //     lastUpdatedBy: { _id: user._id },
  //     child: { _id: child._id },
  //     endedByUser: true,
  //   };
  //   API.saveAction(actionData)
  //   .catch((err) => console.log(err));
  // }

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
        <SetTime setTimeSubmit={setTimeSubmit} showHide={showHide} />
      </main>
    </main>
  );
}
