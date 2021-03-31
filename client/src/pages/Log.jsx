import React, { useState } from "react";
import Hierarchy from "../components/Hierarchy"
import LogBtn from "../components/LogBtn";
import "./log.scss";

export default function Log() {
  const [btn1, setBtn1] = useState({ name: "Diaper", btn: "Diaper" });
  const [btn2, setBtn2] = useState({ name: "Eat", btn: "Eat" });
  const [btn3, setBtn3] = useState({ name: "Nap", btn: "Nap" });
  const [dir, setDir] = useState(["Log>"]);
  
  const updateButtons = (choice, name) => {
    addDir(name)

    switch (choice) {
      case "Default":
      case "Add Now":
      case "End Time":
      case "Set Time":
        setBtns("Diaper", "Eat", "Nap", "Diaper", "Eat", "Nap");
        setDir(dir => ["Log>"]);
        break;
      case "Diaper":
        setBtns("Pee", "Poo", "Both", "now/set", "now/set", "now/set");
        break;
      case "Eat":
        setBtns("Nurse", "Bottle", "Cancel", "Nurse", "Bottle", "Default");
        break;
      case "Nap":
        setBtns("Start Time", "End Time", "Add Time", "Start Time", "End Time", "Add Time");
        break;
      case "Nurse":
        setBtns("Left", "Right", "Cancel", "Feed", "Feed", "Default");
        break;
      case "Feed":
        setBtns("Start", "Stop", "Switch", "Start Time", "End Time", "Nurse");
        break;
      case "Bottle":
        setBtns("Oz", "Add Now", "Add Time", "Oz", "Add Now", "Add Time");
        break;
      case "now/set":
        setBtns("Add Now", "Set Time", "Cancel", "Add Now", "Set Time", "Default");
        break;
      case "Add Time":
        setBtns("Start Time", "End Time", "Cancel", "Start Time", "End Time", "Default");
        break;
      default:
        setBtns("Diaper", "Eat", "Nap", "Diaper", "Eat", "Nap");
        setDir(dir => ["Log>"]);
        break;
    }
  };

  const addDir = (btnName) => {
    if (btnName != "Switch" && btnName != "Start" && btnName != "Oz" && btnName != "Start Time") {
      setDir(dir => [...dir, btnName + ">"]);
    }
  }

  const setBtns = (name1, name2, name3, button1, button2, button3) => {
    setBtn1({ name: name1, btn: button1 });
    setBtn2({ name: name2, btn: button2 });
    setBtn3({ name: name3, btn: button3 });
  };

  console.log(btn1.name, btn2.name, btn3.name);
  console.log(btn1.btn, btn2.btn, btn3.btn);

  return (
    <main className="page">
      <h1>Log Page</h1>
      <Hierarchy dir={dir} />
      <main className="log-container">
        {/* <LogBtn buttonContent="Back" btnAction={() => handleClick} /> <br /> */}
        <LogBtn
          buttonContent={btn1.name}
          btnAction={() => updateButtons(btn1.btn, btn1.name)}
        />{" "}
        {/* <br /> */}
        <LogBtn
          buttonContent={btn2.name}
          btnAction={() => updateButtons(btn2.btn, btn2.name)}
        />{" "}
        {/* <br /> */}
        <LogBtn
          buttonContent={btn3.name}
          btnAction={() => updateButtons(btn3.btn, btn3.name)}
        />{" "}
        {/* <br /> */}
      </main>
    </main>
  );
}
