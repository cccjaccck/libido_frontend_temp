import React, { useRef } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { HeaderWithSetting } from "./MainComponents/Header";
import ProfileCircle from "./MainComponents/ProfileCircle";
import { AiOutlinePlus } from "react-icons/ai";
import useUser from "../hooks/useUser";
import useInput from "../hooks/useInput";
import { addCommas } from "../utils";

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileSection = styled.div`
  width: fit-content;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 24px;
`;

const ProfilePlus = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  background: #fff;
  border: 1px solid #999;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => props.theme.themeColor};
  }
`;

const StatsTitle = styled.div`
  ${(props) => props.theme.subTitle1};
  width: 100%;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  margin-bottom: 24px;
`;

const DropDown = styled.select`
  ${(props) => props.theme.bodyFont2};
  border: none;
  background: #fff;
  width: 93px;
  height: 36px;
  border-radius: 18px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.themeColorRed};
  padding-left: 16px;
  padding-right: 8px;
  :focus {
    outline: none;
  }
`;

const DropOption = styled.option`
  border: none;
  text-align: center;
`;

const StatsSummary = styled.div`
  ${(props) => props.theme.subTitle1};
  letter-spacing: -0.01em;
  color: #999;
  width: 100%;
`;

const StatBoxWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 26px;
`;

const StatBox = styled.div`
  width: 160px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 48px;
`;

const PointCircle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
  background: ${(p) =>
    p.color === "red"
      ? "linear-gradient(#fe5266 0%, #fe5465 45.48%, #fd7f54 100%)"
      : p.color === "yellow"
      ? "linear-gradient(#f8f4dd 0%, #fbe281 100%)"
      : p.color === "violet"
      ? "linear-gradient(#3023ae 0%, #c86dd7 100%)"
      : p.color === "blue" && "linear-gradient(#60a6e5 0%, #37bdde 100%)"};
`;

const StatName = styled.div`
  ${(props) => props.theme.bodyFont2};
  height: 16px;
  display: flex;
`;

const StatInfo = styled.div`
  ${(props) => props.theme.h3};
  font-weight: 700;
  margin-top: 14px;
  height: 46px;
  vertical-align: top;
  text-align: center;
`;

const UPLOAD_AVATAR = gql`
  mutation uploadAvatar($file: Upload) {
    uploadAvatar(file: $file) {
      ok
      error
    }
  }
`;

export const SEE_STAT = gql`
  query seeStat($id: String, $time: Time) {
    seeStat(id: $id, time: $time) {
      totalComments
      totalRooms
      totalVideos
      totalWatchingTime
    }
  }
`;

const MyStudio = () => {
  const time = useInput("MONTH");
  const inputFile = useRef(null);
  const { data: userData } = useUser();

  const { data: userStat } = useQuery(SEE_STAT, {
    variables: { time: time.value },
  });

  const [upload, { loading }] = useMutation(UPLOAD_AVATAR, {
    onCompleted: (d) => window.location.reload(),
  });

  const onUploadClick = () => {
    if (loading) {
      return;
    }
    inputFile.current.click();
  };
  const onChange = ({
    target: {
      validity,
      files: [file],
    },
  }) => validity.valid && upload({ variables: { file } });

  return (
    <Wrapper>
      <Container>
        <HeaderWithSetting to="/myStudio/setting">My Studio</HeaderWithSetting>
        <ProfileSection onClick={onUploadClick}>
          <input
            type="file"
            accept="image/jpg, image/png, image/jpeg"
            style={{ display: "none" }}
            ref={inputFile}
            onChange={onChange}
          />
          <ProfileCircle size={"100px"} imgSource={userData?.seeMe?.avatar} />
          <ProfilePlus>
            <AiOutlinePlus />
          </ProfilePlus>
        </ProfileSection>
        <StatsTitle>
          Stats
          <DropDown onChange={time.onChange}>
            <DropOption value="MONTH">??????</DropOption>
            <DropOption value="WEEK">??????</DropOption>
            <DropOption value="DAY">??????</DropOption>
          </DropDown>
        </StatsTitle>
        <StatsSummary>
          {`?????? 1${
            time.value === "MONTH" ? "???" : time.value === "WEEK" ? "???" : "???"
          } ?????? ?????? ??????????????? ????????? ????????????.`}
        </StatsSummary>
        <StatBoxWrap>
          <StatBox>
            <StatName>
              <PointCircle color={"red"} />??? ????????????
            </StatName>
            <StatInfo>
              {addCommas(userStat?.seeStat.totalWatchingTime) ?? 0}
            </StatInfo>
          </StatBox>
          <StatBox>
            <StatName>
              <PointCircle color={"yellow"} />??? ???????????? ??????
            </StatName>
            <StatInfo>{addCommas(userStat?.seeStat.totalRooms) ?? 0}</StatInfo>
          </StatBox>
          <StatBox>
            <StatName>
              <PointCircle color={"violet"} />
              ?????????
            </StatName>
            <StatInfo>
              {addCommas(userStat?.seeStat.totalComments) ?? 0}
            </StatInfo>
          </StatBox>
          <StatBox>
            <StatName>
              <PointCircle color={"blue"} />
              ?????? ???
            </StatName>
            <StatInfo>{addCommas(userStat?.seeStat.totalVideos) ?? 0}</StatInfo>
          </StatBox>
        </StatBoxWrap>
      </Container>
    </Wrapper>
  );
};

export default MyStudio;
