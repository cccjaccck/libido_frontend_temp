import React, { useState } from "react";
import styled from "styled-components";
import { VscHome } from "react-icons/vsc";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { IconStudio } from "./IconPack";
import { BsChevronCompactUp } from "react-icons/bs";
import { Link } from "react-router-dom";

const DockWrapper = styled.div`
  width: 100%;
  max-width: 425px;
  position: fixed;
  left: 0;
  bottom: ${(props) =>
    props.showUp ? "0" : "calc(-52px - env(safe-area-inset-top))"};
  transition: all ease-in-out 0.3s;
  z-index: 999;
  @media only screen and (min-width: 425px) {
    left: calc(50% - 212.5px);
  }
`;
const Padding = styled.div`
  height: env(safe-area-inset-top);
  background-color: #fff;
`;

const GradientShadow = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0.97) 40%,
    transparent
  );
  bottom: 30px;
  text-align: center;
  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => props.theme.themeColorViolet};
    transform: rotateZ(${(props) => (props.showUp ? "180deg" : "0")});
    transition: all ease-in-out 0.3s;
    cursor: pointer;
  }
`;

const Container = styled.div`
  height: 64px;
  background: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  box-shadow: 0 -2px 6px rgba(36, 15, 57, 0.09);
  position: relative;
`;

const Icons = styled.div`
  width: 90px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
    color: ${(props) => props.theme.themeColorLight};
  }
  cursor: pointer;
`;

const IconTitle = styled.div`
  ${(props) => props.theme.overline};
  color: ${(props) => props.theme.textDefaultBlack};
  height: 12px;
  margin: 0 auto;
  margin-bottom: 8px;
`;

const SlideDock = () => {
  const [showUp, setShowUp] = useState(false);

  const onClickShowUp = () => {
    setShowUp(!showUp);
  };

  return (
    <DockWrapper showUp={showUp}>
      <GradientShadow showUp={showUp}>
        <BsChevronCompactUp onClick={onClickShowUp} />
      </GradientShadow>
      <Container>
        <Link to="/">
          <Icons>
            <VscHome />
            <IconTitle>HOME</IconTitle>
          </Icons>
        </Link>
        <Link to="/search">
          <Icons>
            <AiOutlineSearch />
            <IconTitle>RESEARCH</IconTitle>
          </Icons>
        </Link>
        <Link to="/myStudio">
          <Icons>
            <IconStudio />
            <IconTitle>MY STUDIO</IconTitle>
          </Icons>
        </Link>
        <Link to="/makeRoom">
          <Icons>
            <AiOutlinePlus />
            <IconTitle>MAKE</IconTitle>
          </Icons>
        </Link>
      </Container>
      <Padding />
    </DockWrapper>
  );
};

export default SlideDock;
