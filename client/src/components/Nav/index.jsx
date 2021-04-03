import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./nav.scss";
import Time from "../Time/index";
import Home from "../../img/nav/Home";
import Log from "../../img/nav/Log";
import Profile from "../../img/nav/Profile.jsx";
import Fire from "../../Fire";

function Nav() {
  const location = useLocation();

  const signOut = () => {
    Fire.auth().signOut();
  };

  return (
    <header>
      <Time />
      <nav>
        <div className="nav-container">
          <NavLink
            to="/"
            exact
            className={location.pathname === "/" ? "active" : ""}
          >
            <Home />
          </NavLink>
          <NavLink
            to="/log"
            className={location.pathname === "/log" ? "active" : ""}
          >
            <Log />
          </NavLink>
          <NavLink
            to="/profile"
            className={location.pathname === "/profile" ? "active" : ""}
          >
            <Profile />
          </NavLink>

          <span onClick={signOut}>
            <a href="#">Sign out</a>
          </span>
        </div>
      </nav>
      {/* <div>
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div> */}
    </header>
  );
}

export default Nav;
