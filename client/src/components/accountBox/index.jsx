import React from "react";
import styled from "styled-components";
import Login from "../Sessions/Login"


const BoxContainer = styled.div`
    width: 280px;
    min-height: 550px;
    display: flex;
    flex-direction: column;
    border-radius: 19px;
    background-color: #264653;
    box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
    position: relative;
    overflow: hidden;
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

const BackDrop = styled.div`
    width: 160%;
    height: 550px;
    position: absolute;
    display: flex;
    flex-direction: column;
    border-radius: 50%;
    transform: rotate(60deg);
    top: -290px;
    left: -70px;
    background: rgb(255,255,255);
    background: linear-gradient(211deg, rgba(255,255,255,1) 0%, rgba(233,196,106,1) 32%);
`;

const HeadContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const HeaderText = styled.h2`
    font-size: 30px;
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
    padding: 10px;
`;



export default function AccountBox(props){
    return <BoxContainer>
        <TopContainer>
            <BackDrop />
            <HeadContainer>
                <HeaderText>Hello there!</HeaderText>
                <SmallText>Let's get you signed in!</SmallText>
                <Login />
            </HeadContainer>
        </TopContainer>
    </BoxContainer>
}
