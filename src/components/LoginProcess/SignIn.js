import React, { useState } from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { H6Button } from "../MainComponents/Buttons";
import { EmailInput, PassInput } from "../MainComponents/InputBox";
import PageTitle from "./PageTitle";
import useInput from "../../hooks/useInput";
import { logUserIn } from "../../apollo";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.themeColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ForgotLink = styled.button`
  ${(props) => props.theme.caption};
  color: #fff;
  margin: 24px auto 32px auto;
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const SignIn = () => {
  const email = useInput();
  const password = useInput();
  const [loginMutation] = useMutation(LOGIN, {
    variables: {
      email: email.value,
      password: password.value,
    },
  });

  const handleLogin = async () => {
    try {
      if (email.value && password.value) {
        const {
          data: { login: token },
        } = await loginMutation();
        logUserIn(token);
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <Container>
      <PageTitle>Sign In</PageTitle>
      <EmailInput onChange={email.onChange} />
      <PassInput placeholder={"Password"} onChange={password.onChange} />
      <Link to="/forgotPassword">
        <ForgotLink>Forgot password?</ForgotLink>
      </Link>
      <H6Button onClick={handleLogin}>SIGN IN</H6Button>
      <Link to="/register">
        <H6Button>REGISTER</H6Button>
      </Link>
    </Container>
  );
};

export default SignIn;
