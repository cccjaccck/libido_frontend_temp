import React from "react";
import styled from "styled-components";
import { Logo } from "./MainComponents/IconPack";

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
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Splash = () => {
  setTimeout(() => {
    window.location.replace("/signIn");
  }, 3000);

  return (
    <Wrapper>
      <Container>
        <Logo />
      </Container>
    </Wrapper>
  );
};

export default Splash;
