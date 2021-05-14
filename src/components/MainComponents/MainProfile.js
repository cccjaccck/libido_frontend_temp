import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import ProfileCircle from "./ProfileCircle";

const Container = styled.div`
  width: 100%;
  height: calc(env(safe-area-inset-bottom) + 142px);
  padding: calc(env(safe-area-inset-bottom) + 16px) 16px 8px 16px;
  background: #d8d8d8;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const UserName = styled.div`
  ${(props) => props.theme.h6};
  height: 22px;
  width: 100%;
  text-align: center;
`;

const BottomWrap = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CountWrap = styled.div`
  ${(props) => props.theme.caption};
  color: ${(props) => props.theme.themeColorRed};
  text-align: center;
  width: 100px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Count = styled.div`
  ${(props) => props.theme.h6};
  margin-bottom: 8px;
`;

const ProfileWrap = styled.div`
  position: relative;
`;

const AlarmCount = styled.div`
  ${(props) => props.theme.overline};
  line-height: 14px;
  letter-spacing: 0;
  color: #fff;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
  border-radius: 50%;
  background: ${(props) => props.theme.themeColorRed};
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const numberWithK = (number) => {
  if (number < 1000) {
    return number + "";
  } else {
    return Math.floor(number / 1000) + "k";
  }
};

const MainProfile = () => {
  const { data: userData } = useUser();

  return (
    <Container>
      <UserName>{userData?.seeMe?.username}</UserName>
      <BottomWrap>
        <CountWrap>
          <Count>{userData?.seeMe?.viewCount}h</Count>
          Views
        </CountWrap>
        <ProfileWrap>
          <Link to="/myStudio">
            <ProfileCircle imgSource={userData?.seeMe?.avatar} />
            {/* <AlarmCount>1</AlarmCount> */}
          </Link>
        </ProfileWrap>
        <CountWrap>
          <Count>{numberWithK(userData?.seeMe?.followingCount)}</Count>
          Friends
        </CountWrap>
      </BottomWrap>
    </Container>
  );
};

export default MainProfile;
