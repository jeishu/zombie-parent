import React from "react";

const Hierarchy = (props) => {
  return (
    <ul>
      {props.dir.map((dir) => {
        return (
          <li
            key={dir.key}
            style={{ listStyleType: "none", color: "white", display: "inline" }}
            onClick={() => props.dirTree(dir, dir.btn, dir.name)}
          >
            {dir.name}{`>`}
          </li>
        );
      })}
    </ul>
  );
};

export default Hierarchy;
