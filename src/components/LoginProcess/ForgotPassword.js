import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { H6Button } from "../MainComponents/Buttons";
import { EmailInput } from "../MainComponents/InputBox";
import PageTitle from "./PageTitle";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
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

// const CHANGE_PASSWORD = gql`
//     mutation changePassword($password: String!, $confirm: String!) {
//         changePassword(password: $password, confirm: $confirm) {
//             ok
//             error
//         }
//     }
// `
const CHANGE_PASSWORD = gql`
  mutation requestChangePassword($email: String!) {
    requestChangePassword(email: $email) {
      ok
      error
    }
  }
`;

const ForgotPassword = () => {
  const email = useInput();
  const onCompleted = ({ requestChangePassword }) => {
    if (requestChangePassword) {
      alert("메일이 발송되었습니다. 메일을 확인해주세요");
      window.location.replace("/signIn");
    } else if (requestChangePassword.error) {
      alert(requestChangePassword.error);
    } else {
      alert("네트워크 오류입니다. 잠시 후 다시 시도해 주세요.");
    }
  };
  const [sendMail] = useMutation(CHANGE_PASSWORD, {
    variables: { email: email.value },
    onCompleted,
  });
  return (
    <Wrapper>
      <Container>
        <PageTitle>Forgot password?</PageTitle>
        <EmailInput onChange={email.onChange} />
        <Link to="/signIn">
          <H6Button onClick={sendMail} marginTop={"40px"}>
            Send E-Mail
          </H6Button>
        </Link>
      </Container>
    </Wrapper>
  );
};

export default ForgotPassword;
