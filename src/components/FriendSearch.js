import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import useUser from "../hooks/useUser";
import { SearchButton } from "./MainComponents/Buttons";
import FriendList from "./MainComponents/FriendList";
import { HeaderSearch } from "./MainComponents/Header";

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

export const SEARCH_USERS = gql`
  query searchUsers($term: String, $page: Int) {
    searchUsers(term: $term, page: $page) {
      ok
      error
      users {
        id
        username
        avatar
        isFollowing
      }
      totalPages
    }
  }
`;

const FriendSearch = () => {
  const [isClick, setIsClick] = useState(false); //HeaderSearch
  const term = useInput();

  const { data: userData } = useUser();

  const { data } = useQuery(SEARCH_USERS, {
    variables: { term: term.value },
  });

  const onClickIsClick = () => {
    setIsClick(!isClick);
  };

  const onClickRemove = () => {
    setIsClick(false);
  };

  window.addEventListener("scroll", () => {
    setIsClick(false);
  });

  return (
    <Wrapper>
      <Container>
        <HeaderSearch
          placeholder={"친구를 검색해주세요."}
          isClick={isClick}
          onClickIsClick={onClickIsClick}
          onClickRemove={onClickRemove}
          onChange={term.onChange}
        >
          Find Friend
        </HeaderSearch>
        {data?.searchUsers?.users.map((friend) => (
          <FriendList key={friend.id} myId={userData?.seeMe?.id} {...friend} />
        ))}
        <SearchButton isClick={isClick} onClickRemove={onClickRemove} />
      </Container>
    </Wrapper>
  );
};

export default FriendSearch;
