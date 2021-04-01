import React from "react";
import "./hierarchy.scss"

const Hierarchy = (props) => {
  return (
    <ul className="log-order">
      {props.dir.map((dir) => {
        return (
          <li
            key={dir.key}
<<<<<<< HEAD
            onClick={() => props.dirTree(dir, dir.btn, dir.name)}
=======
            style={{ listStyleType: "none", color: "white", display: "inline" }}
            onClick={() => props.dirTree(dir).then(() => props.updateButtons(dir.btn, dir.name, dir.key - 1))}
>>>>>>> origin
          >
            {dir.name}{`>`}
          </li>
        );
      })}
    </ul>
  );
};

export default Hierarchy;
