import { gql, useMutation } from "@apollo/client";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ProfileCircle from "./ProfileCircle";

const List = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  position: relative;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    position: absolute;
    top: calc(50% - 12px);
    right: 0;
  }
`;

const UnderLine = styled.div`
  width: 287px;
  height: 1px;
  background: rgba(0, 0, 0, 0.12);
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Name = styled.div`
  ${(props) => props.theme.subTitle1};
  width: 100%;
  min-width: 40vw;
  max-width: 255px;
  margin-left: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id) {
      ok
      error
    }
  }
`;
const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id) {
      ok
      error
    }
  }
`;

const FriendList = ({ id, avatar, username, isFollowing, myId }) => {
  const unfollowUpdate = (cache, result) => {
    const {
      data: {
        unfollow: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollowing(prev) {
          return false;
        },
      },
    });
    cache.modify({
      id: `User:${myId}`,
      fields: {
        followingCount(prev) {
          return prev - 1;
        },
      },
    });
  };
  const followUpdate = (cache, result) => {
    const {
      data: {
        follow: { ok },
      },
    } = result;
    if (!ok) {
      return;
    }
    cache.modify({
      id: `User:${id}`,
      fields: {
        isFollowing(prev) {
          return true;
        },
      },
    });
    cache.modify({
      id: `User:${myId}`,
      fields: {
        followingCount(prev) {
          return prev + 1;
        },
      },
    });
  };
  const [follow] = useMutation(FOLLOW, {
    variables: { id },
    update: followUpdate,
  });
  const [unfollow] = useMutation(UNFOLLOW, {
    variables: { id },
    update: unfollowUpdate,
  });

  return (
    <List>
      <Link to={`/user/${id}`}>
        <ProfileCircle size={"40px"} imgSource={avatar} />
      </Link>
      <Link to={`/user/${id}`}>
        <Name>{username}</Name>
      </Link>
      {isFollowing ? (
        <AiOutlineMinus onClick={unfollow} color={"#999"} />
      ) : (
        <AiOutlinePlus onClick={follow} color={"#A7D8D5"} />
      )}
      <UnderLine />
    </List>
  );
};

export default FriendList;
