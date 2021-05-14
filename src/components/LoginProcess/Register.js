import React from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { H6Button } from "../MainComponents/Buttons";
import { EmailInput, CustomInput, PassInput } from "../MainComponents/InputBox";
import PageTitle from "./PageTitle";
import useInput from "../../hooks/useInput";

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

const SIGN_UP = gql`
  mutation createAccount(
    $email: String!
    $username: String!
    $password: String!
  ) {
    createAccount(email: $email, username: $username, password: $password) {
      ok
      error
    }
  }
`;

const Register = () => {
  const email = useInput();
  const username = useInput();
  const password = useInput();
  const confirm = useInput();

  const onCompleted = ({ createAccount }) => {
    if (createAccount && createAccount.ok) {
      alert("회원가입 되었습니다. 로그인 화면으로 돌아갑니다.");
      window.location.replace("/signin");
    } else if (createAccount.error) {
      alert(createAccount.error);
    } else {
      alert("네트워크 오류입니다. \n 잠시 후 다시 시도해 주세요.");
    }
  };

  const [mutation] = useMutation(SIGN_UP, {
    variables: {
      email: email.value,
      username: username.value,
      password: password.value,
    },
    onCompleted,
  });

  const onClick = () => {
    if (
      !password.value ||
      password.value === "" ||
      !username.value ||
      username.value === "" ||
      !email.value ||
      email.value === "" ||
      !confirm.value ||
      confirm.value === ""
    ) {
      alert("입력칸을 모두 채워주세요!");
      return;
    }
    if (password.value === confirm.value) {
      mutation();
    } else {
      alert("비밀번호가 서로 일치하지 않습니다.");
    }
  };

  return (
    <Wrapper>
      <Container>
        <PageTitle>Register</PageTitle>
        <EmailInput onChange={email.onChange} />
        <CustomInput onChange={username.onChange} placeholder={"Username"} />
        <PassInput onChange={password.onChange} placeholder={"Password"} />
        <PassInput
          onChange={confirm.onChange}
          placeholder={"Confirm Password"}
        />
        <H6Button onClick={onClick} marginTop={"24px"}>
          REGISTER
        </H6Button>
      </Container>
    </Wrapper>
  );
};

export default Register;
