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
import Fire from "../../Fire";

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const login = (event) => {
      event.preventDefault();

      // Error handling for incorrect authentication
      Fire.auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          console.error("Incorrect username or password");
        });

      // log inputted email and password
      console.log(`submitted email:
              ${email} password: ${password}`);
    };
  };

  return (
    <BoxContainer>
      <FormContainer>
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
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={login}>
        Sign In
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">Don't have an account? </MutedLink>
      <BoldLink href="#" onClick={switchToSignup}>
        SignUp
      </BoldLink>
    </BoxContainer>
  );
}
