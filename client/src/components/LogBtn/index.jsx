import React from "react";

const LogBtn = (props) => {
  return (
    <button className="log-buttons">
      <h1 onClick={props.btnAction} >{props.buttonContent}</h1>
    </button>
  );
};

export default LogBtn;
