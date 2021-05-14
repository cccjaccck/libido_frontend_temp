import React from "react";
import styled from "styled-components";
import { H6Button } from "./MainComponents/Buttons";
import { CustomInput } from "./MainComponents/InputBox";
import useInput from "../hooks/useInput";
import { MdClose } from "react-icons/md";

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50vh;
  background: #fff;
  border-top: ${(props) => props.theme.themeColor} 2px solid;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  @media only screen and (min-width: 425px) {
    width: 425px;
    margin: 0 auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 50%;
  padding: 0 16px;
  padding-top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomWithPassword = ({ id, url, joinRoom, resetState }) => {
  const password = useInput();

  const onClick = () => {
    joinRoom(url, id, password.value);
  };

  return (
    <Wrapper>
      <MdClose
        style={{
          zIndex: "999",
          position: "absolute",
          right: 15,
          top: 15,
        }}
        size={30}
        color={"#4C5264"}
        onClick={resetState}
      />
      <Container>
        <CustomInput onChange={password.onChange} placeholder={"Password"} />
        <H6Button
          backgroundColor={(props) => props.theme.themeColor}
          color={"#fff"}
          marginTop={"40px"}
          onClick={onClick}
        >
          입장하기
        </H6Button>
      </Container>
    </Wrapper>
  );
};

export default RoomWithPassword;
