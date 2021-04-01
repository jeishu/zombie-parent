import React from "react";

const Hierarchy = (props) => {
  return (
    <ul>
      {props.dir.map((dir) => {
        return (
          <li
            key={dir.key}
            style={{ listStyleType: "none", color: "white", display: "inline" }}
            onClick={() => props.dirTree(dir).then(() => props.updateButtons(dir.btn, dir.name, dir.key - 1))}
          >
            {dir.name}{`>`}
          </li>
        );
      })}
    </ul>
  );
};

export default Hierarchy;
