import React from "react";

const LogBtn = (props) => {
  return (
    <button>
      <h1 style={{width: "100px"}} onClick={props.btnAction} >{props.buttonContent}</h1>
    </button>
  );
};

export default LogBtn;
