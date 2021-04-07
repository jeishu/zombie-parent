import React, { useState } from "react";
import Fire from "../../Fire";
// import API from "../../utils/API";
// import { useStoreContext } from "../../utils/GlobalState";
// import initialLogin from "../../utils/initialLogin";
import "./login.scss";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [state, dispatch] = useStoreContext();

  const login = (event) => {
    event.preventDefault();

    // Error handling for incorrect authentication
    Fire.auth()
      .signInWithEmailAndPassword(email, password)
      // populate user
      // .then((userCredential) => {

      // })
      .catch((error) => {
        console.error("Incorrect username or password");
      });

    // log inputted email and password
    // console.log(`submitted email:
    //     ${email} password: ${password}`);
  };

  const signup = (event) => {
    event.preventDefault();

    // Error handling for incorrect authentication
    Fire.auth()
      .createUserWithEmailAndPassword(email, password)
      // populate user
      // .then((userCredential) => {
      //   // console.log(JSON.stringify(userCredential.user))
      //   initialLogin(userCredential, state, dispatch);
      // })
      .catch((error) => {
        console.error("Incorrect username or password");
      });

    // log inputted email and password
    // console.log(`submitted email:
    //     ${email} password: ${password}`);
  };

  var provider = new Fire.auth.GoogleAuthProvider();

  function googleSignin() {
    Fire.auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;

        // console.log(token);
        // console.log(user);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

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
