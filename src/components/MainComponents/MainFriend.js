import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileCircle from "./ProfileCircle";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
`;

const ProfileContainer = styled.div`
  width: 100px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
  cursor: pointer;
`;

const ProfileWrap = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StatusCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #fff;
  position: absolute;
  top: 5px;
  right: 5px;
  background: ${(p) => (p.isOn ? p.theme.themeColor : "#999999")};
`;

const ProfileText = styled.div`
  ${(props) => props.theme.bodyFont2};
  width: 100%;
  height: 16px;
  text-align: center;
  margin-top: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Profile = ({ id, avatar, username }) => (
  <ProfileContainer>
    <ProfileWrap>
      <ProfileCircle imgSource={avatar} />
      <StatusCircle isOn={true} />
    </ProfileWrap>
    <ProfileText>{username}</ProfileText>
  </ProfileContainer>
);

const GET_MY_FRIENDS = gql`
  query getMyFriends {
    getMyFriends {
      id
      username
      avatar
      isFollowing
    }
  }
`;

const MainFriend = () => {
  const { data } = useQuery(GET_MY_FRIENDS, {
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  return (
    <Container>
      <Link to="/friendSearch">
        <ProfileContainer>
          <ProfileWrap>
            <ProfileCircle addButton={true} />
          </ProfileWrap>
          <ProfileText>친구 추가</ProfileText>
        </ProfileContainer>
      </Link>
      {data?.getMyFriends.map(
        (friend) =>
          friend.isFollowing && (
            <Link to={`/user/${friend.id}`}>
              <Profile {...friend} key={friend.id} />
            </Link>
          )
      )}
    </Container>
  );
};

export default MainFriend;
