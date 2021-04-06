// import React from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Home from "./pages/Home"
// import Log from "./pages/Log"
// import Profile from "./pages/Profile"
// import Nav from "./components/Nav";
// import login from "./pages/login";


// function App() {
  

//   return (
//     <Router>
//       <Nav />
//       <Switch>
//         <Route component={Home} path="/" exact></Route>
//         <Route component={Log} path="/log" exact></Route>
//         <Route component={Profile} path="/profile" exact></Route>
//       </Switch>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"
import Log from "./pages/Log"
import Profile from "./pages/Profile"
import Nav from "./components/Nav";
import Login from "./pages/login";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route component={Home} path="/" exact></Route>
        <Route component={Log} path="/log" exact></Route>
        <Route component={Profile} path="/profile" exact></Route>
        <Route component={Login} path="/login" exact></Route>
      </Switch>
    </Router>
  );
}

export default App;
