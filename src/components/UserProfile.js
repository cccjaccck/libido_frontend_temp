import React from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { HeaderNoBtn } from "./MainComponents/Header";
import ProfileCircle from "./MainComponents/ProfileCircle";
import { AiOutlinePlus } from "react-icons/ai";
import useInput from "../hooks/useInput";
import { addCommas } from "../utils";
import { SEE_STAT } from "./MyStudio";

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

const SEE_USER = gql`
  query seeUser($id: String!) {
    seeUser(id: $id) {
      id
      username
      avatar
      viewCount
      followingCount
    }
  }
`;

const UserProfile = ({ match }) => {
  const {
    params: { id },
  } = match;
  const time = useInput("MONTH");
  const { data: userData } = useQuery(SEE_USER, { variables: { id } });
  const { data: userStat } = useQuery(SEE_STAT, {
    variables: { time: time.value, id },
  });

  return (
    <Wrapper>
      <Container>
        <HeaderNoBtn to="/myStudio/setting">
          {userData?.seeUser?.username}
        </HeaderNoBtn>
        <ProfileSection>
          <ProfileCircle size={"100px"} imgSource={userData?.seeUser?.avatar} />
        </ProfileSection>
        <StatsTitle>
          Stats
          <DropDown onChange={time.onChange}>
            <DropOption value="MONTH">월별</DropOption>
            <DropOption value="WEEK">주별</DropOption>
            <DropOption value="DAY">일별</DropOption>
          </DropDown>
        </StatsTitle>
        <StatsSummary>
          {`지난 1${
            time.value === "MONTH" ? "달" : time.value === "WEEK" ? "주" : "일"
          } 동안 나의 파티룸에서 일어난 일이에요.`}
        </StatsSummary>
        <StatBoxWrap>
          <StatBox>
            <StatName>
              <PointCircle color={"red"} />총 시청시간
            </StatName>
            <StatInfo>
              {addCommas(userStat?.seeStat.totalWatchingTime) ?? 0}
            </StatInfo>
          </StatBox>
          <StatBox>
            <StatName>
              <PointCircle color={"yellow"} />방 만들었던 횟수
            </StatName>
            <StatInfo>{addCommas(userStat?.seeStat.totalRooms) ?? 0}</StatInfo>
          </StatBox>
          <StatBox>
            <StatName>
              <PointCircle color={"violet"} />
              코멘트
            </StatName>
            <StatInfo>
              {addCommas(userStat?.seeStat.totalComments) ?? 0}
            </StatInfo>
          </StatBox>
          <StatBox>
            <StatName>
              <PointCircle color={"blue"} />
              작품 수
            </StatName>
            <StatInfo>{addCommas(userStat?.seeStat.totalVideos) ?? 0}</StatInfo>
          </StatBox>
        </StatBoxWrap>
      </Container>
    </Wrapper>
  );
};

export default UserProfile;
