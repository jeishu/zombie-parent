import React from "react";
import AccountBox from "../components/accountBox";
import Login from "../components/Sessions/Login";

export default function LoginPage() {
  return (
    <main>
      <AccountBox />
      <Login />
    </main>
  );
}

// when on this page, hide nav bar
