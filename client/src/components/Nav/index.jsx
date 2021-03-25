import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./nav.scss"
// import styled from "styled-components";
// import dashboard from "../../img/nav/dashboard.svg";
// import home from "../../img/nav/home.svg";
// import log from "../../img/nav/log.svg";
// import profile from "../../img/nav/profile.svg";

function Nav() {
  const location = useLocation();
  return (
    <header>
      <nav>
        <NavLink to="/" exact className={location.pathname === "/" ? "active" : ""}>Home</NavLink>
        <NavLink to="/log" className={location.pathname === "/log" ? "active" : ""}>Log</NavLink>
        <NavLink to="/profile" className={location.pathname === "/profile" ? "active" : ""}>Profile</NavLink>
      </nav>
    </header>
  );
}

export default Nav;
