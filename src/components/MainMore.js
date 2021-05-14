import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getYoutubeVideos } from "../videos";
import { HeaderNoBtn } from "./MainComponents/Header";
import { ThumbnailCardHor } from "./MainComponents/ThumbnailCard";
import { GET_LIVES, JOIN_ROOM } from "./MainComponents/MainHot";
import { useHistory } from "react-router";
import RoomWithPassword from "./RoomWithPassword";
const Wrapper = styled.div`
  width: 100%;
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
  padding-top: 80px;
  padding-bottom: 100px;
`;

const renderVideos = (videos) =>
  videos &&
  videos.map((video) => <ThumbnailCardHor video={video} isAdd={true} />);

export const MainMoreRecommendation = ({ pageTitle }) => {
  const [recommendations, setRecommendations] = useState([]);
  useEffect(() => {
    getYoutubeVideos().then(({ videos }) => {
      setRecommendations(videos);
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <HeaderNoBtn>{pageTitle ? pageTitle : "Page Title"}</HeaderNoBtn>
        {renderVideos(recommendations)}
      </Container>
    </Wrapper>
  );
};

export const MainMoreStreaming = ({ pageTitle }) => {
  const { data } = useQuery(GET_LIVES);
  const [joinRoomMutation] = useMutation(JOIN_ROOM);
  const [id, setId] = useState();
  const [url, setUrl] = useState();

  const history = useHistory();

  const renderRooms = (rooms) =>
    rooms &&
    rooms.map((room) => {
      const parsedUrl = room.url.replace(window.location.origin, "");

      return room.isLocked ? (
        <div
          onClick={() => {
            setId(room.id);
            setUrl(parsedUrl);
          }}
        >
          <ThumbnailCardHor
            video={{
              ...room.videos[0],
              title: room.title,
              type: room.host.username,
            }}
            isLocked={room.isLocked}
            watchingCount={room.watchingCount}
          />
        </div>
      ) : (
        <div onClick={() => joinRoom(parsedUrl, room.id)}>
          <ThumbnailCardHor
            video={{
              ...room.videos[0],
              title: room.title,
              type: room.host.username,
            }}
            isLocked={room.isLocked}
            watchingCount={room.watchingCount}
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

  return (
    <Wrapper>
      <Container>
        <HeaderNoBtn>{pageTitle ? pageTitle : "Page Title"}</HeaderNoBtn>
        {renderRooms(data?.getLives)}
      </Container>
      {id && (
        <RoomWithPassword
          id={id}
          url={url}
          joinRoom={joinRoom}
          resetState={resetState}
        />
      )}
    </Wrapper>
  );
};
