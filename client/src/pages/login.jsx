import React from "react";
import AccountBox from "../components/accountBox";
import Login from "../components/Sessions/Login";
import Fire from "../Fire";

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

export default function LoginPage() {
  return (
    <main>
      <AccountBox />
      <Login />

      <button onClick={googleSignin}>Google Signin</button>
    </main>
  );
}

// when on this page, hide nav bar
