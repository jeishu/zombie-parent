import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss"
import styled from "styled-components";
import dashboard from "../../img/nav/dashboard.svg";
import home from "../../img/nav/home.svg";
import log from "../../img/nav/log.svg";
import profile from "../../img/nav/profile.svg";

function Nav() {
  return (
    <header>
      <nav>
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/log">Log</NavLink>
        <NavLink to="/Profile">Profile</NavLink>
      </nav>
    </header>
  );
}

export default Nav;
