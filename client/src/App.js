import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Log from "./pages/Log"
import Profile from "./pages/Profile"
import Nav from "./components/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route component={Home} path="/" exact></Route>
        <Route component={Dashboard} path="/dashboard" exact></Route>
        <Route component={Log} path="/log" exact></Route>
        <Route component={Profile} path="/profile" exact></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
