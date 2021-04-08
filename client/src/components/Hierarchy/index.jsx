import React from "react";
import "./hierarchy.scss";

const Hierarchy = (props) => {
  return (
    <ul className="log-order">
      {props.dir.map((dir) => {
        return (
          <li
            className="hierarchy"
            key={dir.key}
            onClick={() =>
              props
                .dirTree(dir)
                .then(() => props.updateButtons(dir.btn, dir.name, dir.key - 1))
            }
          >
            <span className="hierarchy-name"> {dir.name} </span>
          </li>
        );
      })}
    </ul>
  );
};

export default Hierarchy;
