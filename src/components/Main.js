import React, { useState } from "react";
import styled from "styled-components";
import MainFriend from "./MainComponents/MainFriend";
import MainHot from "./MainComponents/MainHot";
import MainMix from "./MainComponents/MainMix";
import MainProfile from "./MainComponents/MainProfile";
import SlideDock from "./MainComponents/SlideDock";
import TabView from "./MainComponents/TabView";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  @media only screen and (min-width: 425px) {
    width: 425px;
    margin: 0 auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.12);
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.themeColor};
  overflow-x: hidden;
`;

const Main = () => {
  const [isClick, setIsClick] = useState(0);

  const onClickIsClick = (index) => {
    setIsClick(index);
  };

  return (
    <Wrapper>
      <Container>
        <MainProfile />
        <SlideDock />
        <TabView isClick={isClick} onClickIsClick={onClickIsClick} />
        {isClick === 0 ? (
          <MainHot />
        ) : isClick === 1 ? (
          <MainMix />
        ) : (
          <MainFriend />
        )}
      </Container>
    </Wrapper>
  );
};

export default Main;
