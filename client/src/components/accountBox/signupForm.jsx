import Fire from "../../Fire";
import React, { useState, useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";


export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signup = (event) => {
    event.preventDefault();

    // Error handling for incorrect authentication
    Fire.auth()
      .createUserWithEmailAndPassword(email, password)
      // populate user
      // .then((userCredential) => {
      //   initUser(userCredential);
      // })
      .catch((error) => {
        console.error("Incorrect username or password");
      });
  };

  return (
    <BoxContainer>
      <FormContainer>
        {/* <Input
          type="text"
          placeholder="Full Name"
        /> */}
        <Input
          type="email"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Email"
        />
        <Input
          type="password"
          onChange={({ target }) => setPassword(target.value)}
          placeholder="Password"
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={signup}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Already have an account?</MutedLink>
      <BoldLink href="#" onClick={switchToSignin}>
        Sign in
            </BoldLink>
    </BoxContainer>
  );
}