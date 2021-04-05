import React from "react";

const LogBtn = (props) => {
  return (
    <div className="log-buttons white">
      <p  onClick={props.btnAction}>
        <span className="bg"></span>
        <span className="base"></span>
        <span className="text" >{props.buttonContent}</span>  {/* props.buttonContent is how we can pass the elapsed time from the state on previously created actions */}
      </p>
    </div>
  );
};

export default LogBtn;
