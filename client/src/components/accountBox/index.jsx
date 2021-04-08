import React, { useState } from "react";
import styled from "styled-components";
import Login from "../Sessions/Login";
import Fire from "../../Fire";
import "./index.scss";
import { LoginForm } from "./loginForm";
import { SignupForm } from "./signupForm"
import { AccountContext } from "./accountContext"
import { motion } from "framer-motion";
// import Login from "../Sessions/Login";
// import LoginForm from "../"

var provider = new Fire.auth.GoogleAuthProvider();

function googleSignin() {
  Fire.auth()
    .signInWithPopup(provider)
    .then(function (result) {
      var token = result.credential.accessToken;
      var user = result.user;

      console.log(token);
      console.log(user);
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;

      console.log(error.code);
      console.log(error.message);
    });
}

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
    background: rgb(255,255,255);
    background: linear-gradient(211deg, rgba(255,255,255,1) 0%, rgba(233,196,106,1) 32%);
`;

const HeaderContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.h2`
    font-size: 50px;
    font-family: 'Rubik';
    font-weight: 600;
    line-height: 1.23;
    color: #fff;
    z-index: 10;
    letter-spacing: 2px;
`;

const SmallText = styled.h5`
    color: #fff;
    font-family: 'Rubik';
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
    expanded:{
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

export default function AccountBox(props){

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

    const contextValue = { switchToSignup, switchToSignin};

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
