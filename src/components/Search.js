import React, { useState } from "react";
import styled from "styled-components";
import { SearchButton } from "./MainComponents/Buttons";
import { FAB } from "./MainComponents/IconPack";
import { HeaderSearch } from "./MainComponents/Header";
import { ThumbnailCardHor } from "./MainComponents/ThumbnailCard";
import { Link, useHistory } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import useInput from "../hooks/useInput";
import { JOIN_ROOM } from "./MainComponents/MainHot";
import RoomWithPassword from "./RoomWithPassword";

const SEARCH_ROOMS = gql`
  query searchRooms($term: String) {
    searchRooms(term: $term) {
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
  padding-top: 80px;
`;

const Search = () => {
  const term = useInput();
  const [search, { data }] = useLazyQuery(SEARCH_ROOMS);
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

  const [isClick, setIsClick] = useState(false);

  const onClickIsClick = () => {
    setIsClick(!isClick);
  };

  const onClickRemove = () => {
    setIsClick(false);
  };

  const onClickSearch = async () => {
    await search({ variables: { term: term.value } });
    setIsClick(false);
  };

  window.addEventListener("scroll", () => {
    setIsClick(false);
  });

  return (
    <Wrapper>
      <Container>
        <HeaderSearch
          placeholder={"방 제목을 검색해주세요."}
          isClick={isClick}
          onClickIsClick={onClickIsClick}
          onClickRemove={onClickRemove}
          onChange={term.onChange}
        >
          Search
        </HeaderSearch>
        {renderRooms(data?.searchRooms)}
        <Link to="/makeRoom">
          <FAB isClick={isClick} />
        </Link>
        <SearchButton isClick={isClick} onClickRemove={onClickSearch} />
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

export default Search;
