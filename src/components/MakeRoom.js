import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import useUser from "../hooks/useUser";
import { copyToClipboard } from "../utils";
import { getYoutubeSearch } from "../videos";
import { H6Button } from "./MainComponents/Buttons";
import { HeaderSearch } from "./MainComponents/Header";
import { CustomInput, PassInput } from "./MainComponents/InputBox";
import RoomPlayList from "./MainComponents/RoomPlayList";
import TabScrollView from "./MainComponents/TabScrollView";
import { RoomThumbnail } from "./MainComponents/ThumbnailCard";

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
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.div`
  width: 100%;
  height: 48px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const SectionThumbnail = styled.div`
  ${(props) => props.theme.subTitle1};
  color: #999;
  width: 100%;
  height: 170px;
  display: flex;
  overflow-x: auto;
  justify-content: ${(p) => (p.isHistory ? "unset" : "center")};
  align-items: ${(p) => (p.isHistory ? "unset" : "center")};
  margin-top: 8px;
`;

const SectionPlayList = styled.div`
  ${(props) => props.theme.subTitle1};
  letter-spacing: -0.02em;
  color: #999;
  width: 100%;
  min-height: 21px;
  max-height: 240px;
  margin-top: 16px;
`;

const SectionRoomSetting = styled.div`
  margin-top: 12px;
  margin-bottom: 38px;
`;

const CREATE_ROOM = gql`
  mutation createRoom(
    $title: String!
    $videos: [VideoInput!]
    $isLocked: Boolean
    $password: String
  ) {
    createRoom(
      title: $title
      videos: $videos
      isLocked: $isLocked
      password: $password
    ) {
      ok
      uri
      error
    }
  }
`;

const RECENT_VIDEOS = gql`
  query recentVideos {
    recentVideos {
      id
      url
      title
      thumbnail
      channelTitle
      type
      createdAt
    }
  }
`;

const MakeRoom = ({ location }) => {
  const video = location?.state?.video;
  const roomTitleRef = useRef();
  const { data: userData } = useUser();
  const term = useInput();
  const password = useInput();
  const roomTitle = useInput(
    video ? `${video.channelTitle}_${video.title}` : undefined
  );
  const url = useInput();
  const [isAutoGen, setIsAutoGen] = useState(true);
  const [results, setResults] = useState([]);
  const [keyPressLoading, setKyePressLoading] = useState(false);

  const { data } = useQuery(RECENT_VIDEOS);

  //HeaderSearch//
  const [isClick, setIsClick] = useState(false);

  const onClickIsClick = () => {
    setIsClick(!isClick);
  };

  const onClickRemove = () => {
    setIsClick(false);
  };

  window.addEventListener("scroll", () => {
    setIsClick(false);
  });

  //RoomPlayList//
  const [playList, setPlayList] = useState(video ? [video] : []);

  const onClick = (v) => {
    if (playList.filter((video) => video.id === v.id).length === 0) {
      if (playList.length < 3) {
        setPlayList((prev) => [...prev, v]);
      } else {
        alert("????????? ?????? 3????????? ????????????!");
      }
    } else {
      setPlayList((prev) => prev.filter((video) => video.id !== v.id));
    }
  };

  const onClickRemoveBtn = (id) => {
    setPlayList(playList.filter((video) => video.id !== id));
  };

  //hasHistory
  const isHistory = true;

  //checkBoxClick
  const [checkboxClick, setCheckboxClick] = useState(false);

  const checkboxClicked = () => {
    setCheckboxClick(!checkboxClick);
  };

  //atSearchUI
  const [isSearch, setIsSearch] = useState(false);

  const onKeyPressTest = async (e) => {
    if (e.key === "Enter" && !keyPressLoading) {
      setIsSearch(true);
      setKyePressLoading(true);
      const { videos } = await getYoutubeSearch(term);
      setResults(videos);
      setKyePressLoading(false);
    }
  };

  const onPointerOutTest = () => {
    setIsSearch(false);
  };

  // url ??????
  const copyUrl = () => {
    if (userData?.seeMe.id) {
      copyToClipboard(
        `${window.location.origin}/player/${userData?.seeMe.id}`
      ).then(
        () => alert("?????? ???????????????."),
        () => alert("????????? ?????????????????????. ?????? ??? ?????? ??????????????????.")
      );
      // navigator.clipboard
      //   .writeText(`${window.location.origin}/player/${userData?.seeMe.id}`)
      //   .then(
      //     () => alert("?????? ???????????????."),
      //     () => alert("????????? ?????????????????????. ?????? ??? ?????? ??????????????????.")
      //   );
    } else {
      alert("????????? ?????????????????????. ?????? ??? ?????? ??????????????????.");
    }
  };

  // mutation
  const onCompleted = (data) => {
    if (data?.createRoom.ok) {
      alert("??? ???????????? ?????????????????????.");
      window.location.replace(data.createRoom.uri);
    } else if (data?.createRoom.error) {
      alert(`??? ???????????? ?????????????????????.\n??????: ${data?.createRoom.error}`);
    } else {
      alert("??? ???????????? ?????????????????????. ?????? ??? ?????? ??????????????????.");
    }
  };

  const [mutation, { loading }] = useMutation(CREATE_ROOM, {
    onCompleted,
  });

  const makeRoom = () => {
    if (loading) {
      return;
    }
    if (!roomTitle.value || roomTitle.value === "") {
      alert("??? ????????? ??????????????????!");
      return;
    }
    if (playList.length > 0) {
      mutation({
        variables: {
          title: roomTitle.value,
          videos: playList.map(
            ({ channelTitle, url, type, title, thumbnail }) => ({
              channelTitle,
              url,
              type,
              title,
              thumbnail,
            })
          ),
          isLocked: checkboxClick,
          password: password.value,
        },
      });
    }
  };

  const onChangeTitle = (e) => {
    roomTitle.onChange(e);
    setIsAutoGen(false);
  };

  useEffect(() => {
    if (playList.length > 0 && (isAutoGen || roomTitle.value === "")) {
      roomTitle.setValue(`${playList[0].channelTitle}_${playList[0].title}`);
      setIsAutoGen(true);
    } else if (isAutoGen && playList.length === 0) {
      roomTitle.setValue("");
      setIsAutoGen(true);
    }
  }, [playList]);

  return (
    <Wrapper>
      <Container>
        <HeaderSearch
          placeholder={"?????? ????????? ??????????????????."}
          isClick={isClick}
          onClickIsClick={onClickIsClick}
          onClickRemove={onClickRemove}
          onKeyPress={onKeyPressTest}
          onPointerOut={onPointerOutTest}
          onChange={term.onChange}
        >
          Make
        </HeaderSearch>
        <TabScrollView />
        <SectionTitle>{isSearch ? "????????????" : "????????????"}</SectionTitle>
        <SectionThumbnail
          isHistory={isHistory}
          style={{
            overflow: "auto",
          }}
        >
          {isSearch
            ? results.map((video) => (
                <RoomThumbnail
                  key={video.id}
                  playList={playList}
                  onClick={() => onClick(video)}
                  {...video}
                />
              ))
            : data?.recentVideos && data.recentVideos.length !== 0
            ? data.recentVideos.map((video) => (
                <RoomThumbnail
                  key={video.id}
                  historyTitle={`${video.channelTitle}_${video.title}`}
                  isHistory={isHistory}
                  onClick={() => onClick(video)}
                  playList={playList}
                  {...video}
                />
              ))
            : "?????? ????????? ????????????."}
        </SectionThumbnail>
        <SectionTitle>??????????????????</SectionTitle>
        <SectionPlayList>
          {playList.length > 0
            ? playList.map((video) => (
                <RoomPlayList
                  key={video.id}
                  onClickRemoveBtn={onClickRemoveBtn}
                  {...video}
                />
              ))
            : "?????? ????????? ????????? ????????????. (3????????? ????????????)"}
        </SectionPlayList>
        <SectionTitle>????????? ??????</SectionTitle>
        <SectionRoomSetting>
          <CustomInput
            placeholder={"?????????"}
            bgColor={"rgba(255, 255, 255, 0)"}
            border={"1px solid rgba(0, 0, 0, .12)"}
            bottomRadius={"4px"}
            label={"?????????"}
            checkbox={true}
            margin={"12px 8px"}
            checkboxClicked={checkboxClicked}
            onChange={onChangeTitle}
            value={roomTitle.value}
          />
          {checkboxClick && (
            <PassInput
              onChange={password.onChange}
              placeholder={"????????????"}
              bgColor={"rgba(255, 255, 255, 0)"}
              border={"1px solid rgba(0, 0, 0, .12)"}
              bottomRadius={"4px"}
              margin={"12px 8px"}
            />
          )}
          <CustomInput
            placeholder={"URL ??????"}
            bgColor={"rgba(255, 255, 255, 0)"}
            border={"1px solid rgba(0, 0, 0, .12)"}
            bottomRadius={"4px"}
            margin={"12px 8px"}
            withBtn={true}
            btnText={"????????????"}
            value={`${window.location.origin}/player/${userData?.seeMe.id}`}
            onChange={url.onChange}
            btnOnClick={copyUrl}
          />
          <H6Button
            backgroundColor={(props) => props.theme.themeColor}
            color={"#fff"}
            marginTop={"12px"}
            onClick={makeRoom}
          >
            ?????????
          </H6Button>
        </SectionRoomSetting>
      </Container>
    </Wrapper>
  );
};

export default MakeRoom;
