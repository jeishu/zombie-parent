import React from "react";

const Hierarchy = (props) => {
  console.log(props.dir);
  return (
    <ul>
      {props.dir.map((dir) => {
        return <li key={dir} style={{listStyleType: "none", color: "white", display: "inline"}} >{dir}</li>;
      })}
    </ul>
  );
};

export default Hierarchy;
