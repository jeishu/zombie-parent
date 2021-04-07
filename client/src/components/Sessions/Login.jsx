import React, { useState } from "react";
import Fire from "../../Fire";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import initialLogin from "../../utils/initialLogin";
import "./login.scss";
import loginChecklist from "../../utils/loginFunctions";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [state, dispatch] = useStoreContext();

  const setUser = (user) => {
    dispatch({
      type: "setUser",
      user,
    })
      .then(() => {
        loginChecklist();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const initUser = (userCredential) => {
    let user = userCredential.user;
    API.getUserByUid(user.uid)
      .then((result) => {
        if (!result.data) {
          API.createUser({ uid: user.uid, email: user.email })
            .then((result) => {
              setUser(result.data);
            })
            .catch((error) => console.error(error));
        } else {
          setUser(result.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const login = (event) => {
    event.preventDefault();

    Fire.auth()
      .signInWithEmailAndPassword(email, password)
      // populate user
      .then((userCredential) => {
        initUser(userCredential);
      })
      .catch((error) => {
        console.error("Incorrect username or password");
      });
  };

  const signup = (event) => {
    event.preventDefault();

    // Error handling for incorrect authentication
    Fire.auth()
      .createUserWithEmailAndPassword(email, password)
      // populate user
      .then((userCredential) => {
        // console.log(JSON.stringify(userCredential.user))
        initUser(userCredential);
      })
      .catch((error) => {
        console.error("Incorrect username or password");
      });
  };

  var provider = new Fire.auth.GoogleAuthProvider();

  function googleSignin() {
    Fire.auth()
      .signInWithPopup(provider)
      .then((userCredential) => {
        initUser(userCredential);
      })
      .catch(function (error) {
        console.log(error.code);
        console.log(error.message);
      });
  }

  return (
    <div>
      <form>
        <input
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
        />
        <br />
        <input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
        <br />
        <button type="submit" onClick={login}>
          Sign In
        </button>
        <button type="submit" onClick={signup}>
          Sign Up
        </button>
        <button onClick={googleSignin}>Google Signin</button>
      </form>
    </div>
  );
};

export default Login;
