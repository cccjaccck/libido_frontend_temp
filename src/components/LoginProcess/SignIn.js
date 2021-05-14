import React from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { H6Button } from "../MainComponents/Buttons";
import { EmailInput, PassInput } from "../MainComponents/InputBox";
import PageTitle from "./PageTitle";
import useInput from "../../hooks/useInput";
import { logUserIn } from "../../apollo";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: ${(props) => props.theme.themeColor};
  @media only screen and (min-width: 425px) {
    width: 425px;
    margin: 0 auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  }
`;

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
    login(email: $email, password: $password) {
      ok
      token
      error
    }
  }
`;

const SignIn = () => {
  const email = useInput();
  const password = useInput();

  const onCompleted = ({ login }) => {
    if (login && login.ok) {
      logUserIn(login.token);
    } else {
      alert(login.error);
    }
  };

  const [loginMutation] = useMutation(LOGIN, {
    variables: {
      email: email.value,
      password: password.value,
    },
    onCompleted,
  });

  const login = () => {
    if (
      email.value &&
      email.value !== "" &&
      password.value &&
      password.value !== ""
    )
      loginMutation();
  };

  return (
    <Wrapper>
      <Container>
        <PageTitle>Sign In</PageTitle>
        <EmailInput onChange={email.onChange} />
        <PassInput placeholder={"Password"} onChange={password.onChange} />
        <Link to="/forgotPassword">
          <ForgotLink>Forgot password?</ForgotLink>
        </Link>
        <H6Button onClick={login}>SIGN IN</H6Button>
        <Link to="/register">
          <H6Button>REGISTER</H6Button>
        </Link>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
