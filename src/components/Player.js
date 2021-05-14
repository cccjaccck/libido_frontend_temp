import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import PlayerChat from "./MainComponents/PlayerChat";
import PlayerFrame from "./MainComponents/PlayerFrame";
import PlayerProfile from "./MainComponents/PlayerProfile";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ff0000;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ChatContainer = styled.div`
  width: 240px;
  padding: 0 12px;
  height: 100vh;
  background: #fff;
  overflow: hidden;
`;

const SEE_ROOM = gql`
  query seeRoom($hostId: String!) {
    seeRoom(hostId: $hostId) {
      id
      title
      host {
        id
        username
        avatar
      }
      watching {
        id
        username
        avatar
        isMe
      }
      videos {
        url
      }
      messages {
        id
        text
        createdAt
        user {
          username
          avatar
        }
        isMine
      }
    }
  }
`;

const MESSAGE_UPDATES = gql`
  subscription messageUpdates($hostId: String!) {
    messageUpdates(hostId: $hostId) {
      id
      text
      user {
        id
        avatar
        username
      }
      createdAt
      isMine
    }
  }
`;
const JOIN_UPDATES = gql`
  subscription joinUpdates($hostId: String!) {
    joinUpdates(hostId: $hostId) {
      id
      avatar
      username
    }
  }
`;
const EXIT_UPDATES = gql`
  subscription exitUpdates($hostId: String!) {
    exitUpdates(hostId: $hostId) {
      id
      avatar
      username
    }
  }
`;

const EXIT_ROOM = gql`
  mutation exitRoom {
    exitRoom {
      ok
      error
    }
  }
`;

const Player = ({ match }) => {
  const {
    params: { id: hostId },
  } = match;

  const { data, subscribeToMore, client } = useQuery(SEE_ROOM, {
    variables: { hostId },
  });

  // const client = useApolloClient();

  // message subscription
  const updateQueryMessage = (prevQuery, options) => {
    const {
      subscriptionData: {
        data: { messageUpdates: message },
      },
    } = options;
    if (message.id) {
      const incomingMessage = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            text
            user {
              username
              avatar
            }
            isMine
            createdAt
          }
        `,
        data: message,
      });
      client.cache.modify({
        id: `Room:${prevQuery.seeRoom.id}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find((aMessage) => {
              return aMessage.__ref === incomingMessage.__ref;
            });
            if (existingMessage) {
              return prev;
            }
            return [...prev, incomingMessage];
          },
        },
      });
    }
  };
  const subscribeToNewMessage = () =>
    subscribeToMore({
      document: MESSAGE_UPDATES,
      variables: {
        hostId,
      },
      updateQuery: updateQueryMessage,
    });

  // join subscription
  const updateQueryJoin = (prevQuery, options) => {
    const {
      subscriptionData: {
        data: { joinUpdates: user },
      },
    } = options;
    if (user.id) {
      const newMessageRefs = client.cache.writeFragment({
        fragment: gql`
          fragment NewUser on User {
            id
            username
            avatar
          }
        `,
        data: user,
      });
      client.cache.modify({
        id: `Room:${prevQuery.seeRoom.id}`,
        fields: {
          watching(prev, { readField }) {
            const existingUser = prev.find(
              (aUser) => readField("id", aUser) === user.id
            );
            if (existingUser) {
              return prev;
            }
            return [...prev, newMessageRefs];
          },
        },
      });
    }
  };
  const subscribeToNewJoin = async () => {
    await subscribeToMore({
      document: JOIN_UPDATES,
      variables: {
        hostId,
      },
      updateQuery: updateQueryJoin,
    });
  };
  // exit subscription
  const updateQueryExit = (prevQuery, options) => {
    const {
      subscriptionData: {
        data: { exitUpdates: user },
      },
    } = options;
    if (user.id) {
      client.cache.modify({
        id: `Room:${prevQuery.seeRoom.id}`,
        fields: {
          watching(prev, { readField }) {
            return prev.filter(
              (userRef) => user.id !== readField("id", userRef)
            );
          },
        },
      });
    }
  };
  const subscribeToNewExit = () =>
    subscribeToMore({
      document: EXIT_UPDATES,
      variables: {
        hostId,
      },
      updateQuery: updateQueryExit,
    });

  // exitRoom
  const [exitRoomMutation] = useMutation(EXIT_ROOM);

  const exitRoom = async () => exitRoomMutation();

  useEffect(() => exitRoom, []);

  return (
    <Wrapper>
      <Container>
        <PlayerFrame
          title={data?.seeRoom?.title}
          videos={data?.seeRoom?.videos}
          exitRoom={exitRoom}
        />
        <ChatContainer>
          <PlayerProfile
            users={data?.seeRoom?.watching}
            subscribeToNewJoin={subscribeToNewJoin}
            subscribeToNewExit={subscribeToNewExit}
          />
          <PlayerChat
            hostId={hostId}
            messages={data?.seeRoom?.messages}
            subscribeToNewMessage={subscribeToNewMessage}
          />
        </ChatContainer>
      </Container>
    </Wrapper>
  );
};

export default Player;
