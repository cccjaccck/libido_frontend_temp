import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { getTime } from "../../utils";
import { ChatMessageMy, ChatMessageOther } from "./ChatMessage";
import { ChatInput } from "./InputBox";

const ChatSectionContainer = styled.div`
  width: 100%;
  height: calc(100% - 54px);
  overflow-y: auto;
  padding-bottom: 56px;
`;

const renderMessages = (messages) =>
  messages.map((message, index) => {
    if (message.isMine) {
      return (
        <ChatMessageMy
          key={index}
          avatar={message.user.avatar}
          date={getTime(message.createdAt)}
          text={message.text}
        />
      );
    } else {
      return (
        <ChatMessageOther
          key={index}
          avatar={message.user.avatar}
          date={getTime(message.createdAt)}
          text={message.text}
        />
      );
    }
  });

const ChatSection = ({ messages }) => (
  <ChatSectionContainer>
    {messages && renderMessages(messages)}
    <AlwaysScrollToBottom messages={messages} />
  </ChatSectionContainer>
);

const AlwaysScrollToBottom = ({ messages }) => {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current.scrollIntoView({ behavor: "smooth" });
  }, [messages]);
  return <div ref={elementRef} />;
};

const SEND_MESSAGE = gql`
  mutation sendMessage($hostId: String!, $text: String!) {
    sendMessage(hostId: $hostId, text: $text) {
      ok
      error
    }
  }
`;

const PlayerChat = ({ hostId, subscribeToNewMessage, messages }) => {
  const text = useInput();
  const [mutation] = useMutation(SEND_MESSAGE, {
    variables: { hostId, text: text.value },
    onCompleted: () => text.resetValue(""),
  });

  useEffect(() => {
    subscribeToNewMessage();
  }, []);

  return (
    <>
      <ChatSection messages={messages} />
      <ChatInput
        onChange={text.onChange}
        value={text.value ?? ""}
        onClick={() => text.value && text.value !== "" && mutation()}
      />
    </>
  );
};

export default PlayerChat;
