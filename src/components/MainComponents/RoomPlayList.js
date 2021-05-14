import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";

const Container = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const Image = styled.img`
  width: 100px;
  height: 56px;
  object-fit: cover;
  object-position: center center;
`;

const RightWrap = styled.div`
  width: 227px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
`;

const TextWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.div`
  ${(props) => props.theme.subTitle1};
  max-width: 179px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Publisher = styled.div`
  ${(props) => props.theme.bodyFont2};
  color: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RoomPlayList = ({
  thumbnail,
  title,
  channelTitle,
  onClickRemoveBtn,
  id,
}) => {
  return (
    <Container>
      <Image src={thumbnail} />
      <RightWrap>
        <TextWrap>
          <Title>{title}</Title>
          <Publisher>{channelTitle}</Publisher>
        </TextWrap>
        <FiX size={24} onClick={() => onClickRemoveBtn(id)} />
      </RightWrap>
    </Container>
  );
};

export default RoomPlayList;
