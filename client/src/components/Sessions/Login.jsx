import React, { useState } from "react";
import Fire from "../../Fire";
import API from "../../utils/API";
import { useStoreContext } from "../../utils/GlobalState";
import "./login.scss";


const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [state, dispatch] = useStoreContext();

  const login = (event) => {
    event.preventDefault();

    // Error handling for incorrect authentication
    Fire.auth()
      .signInWithEmailAndPassword(email, password)
      // populate user
      .then((userCredential) => {
        // console.log(JSON.stringify(userCredential.user))
        let user = userCredential.user;

        //api.getUser
        API.getUserByUid(user.uid)
        .then(dbModel => {
          dispatch({
            type: "setUser",
            user: dbModel
          })
          .then(console.log(JSON.stringify(state)))
          .catch((error) => {console.error(error)})
        })
      })
      .catch((error) => {
        console.error("Incorrect username or password");
      });

    // log inputted email and password
    console.log(`submitted email:
        ${email} password: ${password}`);
  };

  const signup = (event) => {
    event.preventDefault();

    // Error handling for incorrect authentication
    Fire.auth()
      .createUserWithEmailAndPassword(email, password)
      // populate user
      .then((userCredential) => {
        // console.log(JSON.stringify(userCredential.user))
        let user = userCredential.user;
        API.createUser({
          uid: user.uid,
          email
        })
        .then((dbModel) => {
          console.log(JSON.stringify(dbModel));
          dispatch({
            type: "setUser",
            user: dbModel
          })
          .then(console.log(JSON.stringify(state)))  // after this run other login get requests
          .catch((error) => {console.error(error)})
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.error("Incorrect username or password");
      });

    // log inputted email and password
    console.log(`submitted email:
        ${email} password: ${password}`);
  };

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
      </form>
    </div>
  );
};

export default Login;
