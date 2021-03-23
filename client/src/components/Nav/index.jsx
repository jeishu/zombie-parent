import React from "react";
import { NavLink } from "react-router-dom";
import "./nav.scss"
import styled from "styled-components";

function Nav() {
  return (
    <header>
      <nav>
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/log">Log</NavLink>
        <NavLink to="/Profile">About Me</NavLink>
      </nav>
    </header>
  );
}

export default Nav;
