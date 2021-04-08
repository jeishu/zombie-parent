import React, { useState } from "react";
import styled from "styled-components";
import Fire from "../../Fire";
import "./index.scss";
import Login from "../Sessions/Login";
import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm";
import { AccountContext } from "./accountContext";
import { motion } from "framer-motion";
import { useStoreContext } from "../../utils/GlobalState";
import { initUser } from "../../utils/loginFunctions";

var provider = new Fire.auth.GoogleAuthProvider();

const BoxContainer = styled.div`
  width: 600px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 19px;
  background-color: #264653;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
  margin-top: 50px;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  top: -200px;
  left: -70px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    211deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(233, 196, 106, 1) 32%
  );
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 50px;
  font-family: "Rubik";
  font-weight: 600;
  line-height: 1.23;
  color: #ffffff;
  text-shadow: 5px 5px 10px rgba(38, 70, 83, 0.4),
               5px 5px 20px rgba(38, 70, 83, 0.4);
  z-index: 10;
  letter-spacing: 2px;
`;

const SmallText = styled.h5`
  color: #fff;
  text-shadow: 5px 5px 10px #1a3038,
               5px 5px 10px #1a3038;
  font-family: "Rubik";
  font-weight: 300;
  font-size: 15px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1.8rem;
`;

const backdropVariants = {
  expanded: {
    width: "180%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.1,
  stiffness: 30,
};

export default function AccountBox(props) {
  const [state, dispatch] = useStoreContext();

  function googleSignin() {
    Fire.auth()
      .signInWithPopup(provider)
      .then((userCredential) => {
        initUser(userCredential, state, dispatch);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("signin");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <BoxContainer>
        <TopContainer>
          <BackDrop
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={backdropVariants}
            transition={expandingTransition}
          />
          {active === "signin" && (
            <HeaderContainer>
              <HeaderText>Welcome</HeaderText>
              <HeaderText>Back!</HeaderText>
              <SmallText>Please sign-in to continue.</SmallText>
            </HeaderContainer>
          )}
          {active === "signup" && (
            <HeaderContainer>
              <HeaderText>Create</HeaderText>
              <HeaderText>Account</HeaderText>
              <SmallText>Please sign-up to continue.</SmallText>
            </HeaderContainer>
          )}
        </TopContainer>
        <InnerContainer>
          {active === "signin" && <LoginForm />}
          {active === "signup" && <SignupForm />}
          <button onClick={googleSignin}>Google Signin</button>
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
