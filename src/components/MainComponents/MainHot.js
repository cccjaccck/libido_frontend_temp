import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { getYoutubeVideos } from "../../videos";
import RoomWithPassword from "../RoomWithPassword";
import { ThumbnailCardVert } from "./ThumbnailCard";

export const GET_LIVES = gql`
  query getLives {
    getLives {
      id
      hostId
      host {
        username
      }
      url
      title
      password
      isLocked
      videos {
        id
        thumbnail
        title
        channelTitle
        type
      }
      watchingCount
    }
  }
`;

export const JOIN_ROOM = gql`
  mutation joinRoom($id: Int!, $password: String) {
    joinRoom(id: $id, password: $password) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SectionTitle = styled.div`
  ${(props) => props.theme.subtitle1};
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid;
  margin-bottom: 16px;
`;

const ViewAllBtn = styled.button`
  ${(props) => props.theme.bodyFont2};
  height: 14px;
`;

const Section = styled.section`
  width: calc(100%);
  height: fit-content;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: auto;
  margin-bottom: 16px;
`;

const renderVideos = (videos) =>
  videos &&
  videos.map((video) => (
    <Link
      to={{
        pathname: "/makeRoom",
        state: { video },
      }}
    >
      <ThumbnailCardVert video={video} />
    </Link>
  ));

const MainHot = () => {
  const [recommendations, setRecommendations] = useState([]);
  const { data } = useQuery(GET_LIVES);
  const [joinRoomMutation] = useMutation(JOIN_ROOM);
  const [id, setId] = useState();
  const [url, setUrl] = useState();

  const history = useHistory();

  const renderRooms = (rooms) =>
    rooms &&
    rooms.map((room) => {
      const parsedUrl = room.url.replace("http://localhost:3000", "");

      return room.isLocked ? (
        <div
          onClick={() => {
            setId(room.id);
            setUrl(parsedUrl);
          }}
        >
          <ThumbnailCardVert
            video={{
              ...room.videos[0],
              title: room.title,
              type: room.host.username,
            }}
          />
        </div>
      ) : (
        <div onClick={() => joinRoom(parsedUrl, room.id)}>
          <ThumbnailCardVert
            video={{
              ...room.videos[0],
              title: room.title,
              type: room.host.username,
            }}
          />
        </div>
      );
    });

  const joinRoom = async (url, id, password) => {
    const { data } = await joinRoomMutation({
      variables: { id: parseInt(id), password },
    });
    if (data?.joinRoom?.ok) {
      history.push(url);
    } else if (data?.joinRoom?.error) {
      alert(data?.joinRoom?.error);
    }
  };

  const resetState = () => {
    setId(null);
    setUrl(null);
  };

  useEffect(() => {
    getYoutubeVideos().then(({ videos }) => {
      setRecommendations(videos);
    });
  }, []);
  return (
    <Container>
      <SectionTitle>
        Recommendation
        <Link to="/mainRecommendation">
          <ViewAllBtn>모두 보기</ViewAllBtn>
        </Link>
      </SectionTitle>
      <Section>{renderVideos(recommendations)}</Section>
      <SectionTitle>
        Streaming
        <Link to="/mainStreaming">
          <ViewAllBtn>모두 보기</ViewAllBtn>
        </Link>
      </SectionTitle>
      <Section>{renderRooms(data?.getLives)}</Section>
      {id && (
        <RoomWithPassword
          id={id}
          url={url}
          joinRoom={joinRoom}
          resetState={resetState}
        />
      )}
    </Container>
  );
};

export default MainHot;
