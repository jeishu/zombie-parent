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
import { StoreProvider } from "./utils/GlobalState";

function App() {
  // Set default log state to false
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If user is logged in, return user, else set log status to false
  Fire.auth().onAuthStateChanged((user) => {
    return user
      ? setIsLoggedIn(true)
      : setIsLoggedIn(false);
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
