import React from "react";

const LogBtn = (props) => {
  return (
    <div className="log-buttons white">
      <p  onClick={props.btnAction}>
        <span className="base"></span>
        <span className="bg"></span>
        <span className="text" >{props.buttonContent}</span>
      </p>
    </div>
  );
};

export default LogBtn;
