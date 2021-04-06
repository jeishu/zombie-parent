import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect,
} from "react-router-dom";
import Fire from "./Fire";
import Home from "./pages/Home";
import Log from "./pages/Log";
import LoginPage from "./pages/login";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import { useStoreContext, StoreProvider } from "./utils/GlobalState";
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import API from "./utils/API";

function App() {
  // Set default log state to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ user, setUser] = useState();

  function startUp(user) {
    API.getUserByUid(user.uid)
    .then((dbModel) => {
      setUser(dbModel)
        .then(console.log(user, dbModel))
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function shutDown() {
    setUser({});
  }

  // If user is logged in, return user, else set log status to false
  Fire.auth().onAuthStateChanged((user) => {
    return user
      ? ( setIsLoggedIn(true) ,  startUp(user))
      : (setIsLoggedIn(false), shutDown());
  });

  console.log("logged in?", isLoggedIn);

  return (
    <Router>
      <StoreProvider>
        <Nav />
        <Switch>
          <Route component={Home} path="/" exact>
            {isLoggedIn ? <Home /> : <LoginPage />}
          </Route>
          <Route component={Log} path="/log" exact>
            {isLoggedIn ? <Log /> : <LoginPage />}
          </Route>
          <Route component={Profile} path="/profile" exact>
            {isLoggedIn ? <Profile /> : <LoginPage />}
          </Route>
        </Switch>
      </StoreProvider>
    </Router>
  );
}

export default App;
