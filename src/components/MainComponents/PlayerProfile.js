import React, { useEffect } from "react";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import ProfileCircle from "./ProfileCircle";
const ProfileHeader = styled.div`
  width: calc(100% + 12px);
  height: 54px;
  display: flex;
  align-items: center;
  overflow-x: auto;
`;

const ProfileCircleWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(p) =>
    p.isMy
      ? "linear-gradient(#fe5266 0%, #fe5465 45.48%, #fd7f54 100%)"
      : "linear-gradient(#92dfae 0%, #80d9c4 100%)"};
  margin-left: 8px;
  :first-of-type {
    margin-left: 0;
  }
  flex: 0 0 auto;
`;

const PlayerProfile = ({ users, subscribeToNewJoin, subscribeToNewExit }) => {
  const { data: userData } = useUser();
  const renderUsers = () =>
    users &&
    users.map((user) =>
      user.isMe ? null : (
        <ProfileCircleWrapper key={user.id} isMy={false}>
          <ProfileCircle imgSource={user.avatar} size={"36px"} />
        </ProfileCircleWrapper>
      )
    );

  useEffect(() => {
    subscribeToNewExit();
    subscribeToNewJoin();
  }, []);
  return (
    <ProfileHeader>
      <ProfileCircleWrapper isMy={true}>
        <ProfileCircle imgSource={userData?.seeMe?.avatar} size={"36px"} />
      </ProfileCircleWrapper>
      {renderUsers()}
    </ProfileHeader>
  );
};
export default PlayerProfile;
