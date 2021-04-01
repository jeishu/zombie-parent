import React from "react";
import "./hierarchy.scss"

const Hierarchy = (props) => {
  return (
    <ul className="log-order">
      {props.dir.map((dir) => {
        return (
          <li
            key={dir.key}
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
