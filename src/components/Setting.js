import React from "react";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { H6Button } from "./MainComponents/Buttons";
import { HeaderNoBtn } from "./MainComponents/Header";
import { CustomInput, PassInput } from "./MainComponents/InputBox";
import useInput from "../hooks/useInput";
import { logUserOut } from "../apollo";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  padding-top: env(safe-area-inset-top);
  @media only screen and (min-width: 425px) {
    width: 425px;
    margin: 0 auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 0 16px;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EDIT_USER = gql`
  mutation editUser($username: String, $password: String) {
    editUser(username: $username, password: $password) {
      ok
      error
    }
  }
`;

const Setting = () => {
  const username = useInput();
  const password = useInput();
  const confirm = useInput();

  const onCompleted = (data) => {
    if (data?.editUser?.ok) {
      alert("변경 되었습니다.");
      window.history.back();
    } else if (data?.editUser?.error) {
      alert(data.editUser.error);
    }
  };

  const [editUser, { loading }] = useMutation(EDIT_USER, {
    variables: { username: username.value, password: password.value },
    onCompleted,
  });

  const onClick = () => {
    if (loading) {
      return;
    }
    if (password.value !== confirm.value) {
      alert("비밀번호가 서로 일치하지 않습니다.");
      return;
    }
    editUser();
  };

  return (
    <Wrapper>
      <Container>
        <HeaderNoBtn>Setting</HeaderNoBtn>
        <CustomInput onChange={username.onChange} placeholder={"Username"} />
        <PassInput onChange={password.onChange} placeholder={"Password"} />
        <PassInput
          onChange={confirm.onChange}
          placeholder={"Confirm Password"}
        />
        <H6Button
          backgroundColor={(props) => props.theme.themeColor}
          color={"#fff"}
          marginTop={"40px"}
          onClick={onClick}
        >
          저장하기
        </H6Button>
        <H6Button
          backgroundColor={(props) => props.theme.themeColor}
          color={"#fff"}
          marginTop={"24px"}
          onClick={logUserOut}
        >
          로그아웃
        </H6Button>
      </Container>
    </Wrapper>
  );
};

export default Setting;
