import React from "react";
import styled from "styled-components";
import ProfileCircle from "./ProfileCircle";

const Container = styled.div`
  width: 100%;
  min-height: 26px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  > div {
    flex: 0 0 auto;
  }
  margin: 8px 0;
  position: relative;
`;

const Text = styled.div`
  ${(props) => props.theme.chat};
  max-width: 142px;
  min-height: 26px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background: #f2f4ff;
  padding: 8px;
  margin: 0 4px;
  color: #2d3e50;
`;

const Date = styled.div`
  font-size: 8px;
  line-height: 16px;
  font-weight: 400;
  color: #919bb0;
  align-self: flex-end;
`;

export const ChatMessageMy = ({ date, avatar, text }) => {
  return (
    <Container style={{ justifyContent: "flex-end" }}>
      <Date>{date}</Date>
      <Text>{text}</Text>
      <ProfileCircle imgSource={avatar} size={"24px"} />
    </Container>
  );
};

export const ChatMessageOther = ({ date, avatar, text }) => {
  return (
    <Container>
      <ProfileCircle imgSource={avatar} size={"24px"} />
      <Text>{text}</Text>
      <Date>{date}</Date>
    </Container>
  );
};
