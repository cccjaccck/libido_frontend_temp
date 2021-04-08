import React, { useState } from "react";
import styled from "styled-components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { IconSendCustom } from "./IconPack";

const InputBox = styled.input`
  width: 328px;
  height: 56px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background: ${(p) => (p.bgColor ? p.bgColor : "rgba(0, 0, 0, .04)")};
  border: ${(p) => (p.border ? p.border : "none")};
  /* border-bottom: 1px solid rgba(255, 255, 255, .6); */
  border-bottom: ${(p) =>
    p.border ? p.border : "1px solid rgba(255, 255, 255, .6)"};
  border-bottom-left-radius: ${(p) =>
    p.bottomRadius ? p.bottomRadius : "none"};
  border-bottom-right-radius: ${(p) =>
    p.bottomRadius ? p.bottomRadius : "none"};
  margin: ${(p) => (p.margin ? p.margin : "16px 8px")};
  padding-left: 16px;
  ::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const InputWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const PassVisibleIcon = styled(AiFillEye)`
  width: 24px;
  height: 24px;
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  right: 20px;
  top: calc(50% - 12px);
`;

const PassInVisibleIcon = styled(AiFillEyeInvisible)`
  width: 24px;
  height: 24px;
  color: rgba(0, 0, 0, 0.6);
  position: absolute;
  right: 20px;
  top: calc(50% - 12px);
`;

const CheckBoxWrapper = styled.div`
  display: ${(p) => (p.checkbox ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  position: absolute;
  top: calc(50% - 9px);
  right: 20px;
`;

const CheckBoxLabel = styled.label`
  ${(props) => props.theme.overline};
`;

const CheckBoxBtn = styled.input`
  width: 18px;
  height: 18px;
  margin-left: 7px;
`;

const Btn = styled.button`
  ${(props) => props.theme.buttonText};
  display: ${(p) => (p.withBtn ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 25px;
  border-radius: 12.5px;
  background: linear-gradient(#92dfae 0%, #80d9c4 97.91%, #60ffe9 100%);
  color: #fff;
  position: absolute;
  top: calc(50% - 12.5px);
  right: 20px;
`;

const ChatInputWrapper = styled.div`
  width: 240px;
  height: 56px;
  background: #fff;
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatInputBox = styled.input`
  border: none;
  background: #f2f2f2;
  width: calc(240px - 24px);
  height: 40px;
  border-radius: 20px;
  padding-left: 17px;
  padding-right: 40px;
  ${(props) => props.theme.bodyFont2};
  overflow: hidden;
  color: #2d3e50;
  ::placeholder {
    color: rgba(153, 153, 153, 0.87);
  }
`;

const ChatSend = styled(IconSendCustom)`
  position: absolute;
  right: 22px;
`;

export const EmailInput = ({ bgColor, border, margin, value, onChange }) => {
  return (
    <InputBox
      value={value}
      onChange={onChange}
      placeholder={"E-Mail"}
      bgColor={bgColor}
      border={border}
      margin={margin}
    />
  );
};

export const PassInput = ({
  placeholder,
  bgColor,
  border,
  margin,
  value,
  onChange,
}) => {
  const [visible, setVisible] = useState(false);

  const IsSetVisible = () => {
    setVisible(!visible);
  };

  return (
    <InputWrapper>
      <InputBox
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        bgColor={bgColor}
        border={border}
        margin={margin}
        type={visible ? "text" : "password"}
      />
      {visible ? (
        <PassInVisibleIcon onClick={IsSetVisible} />
      ) : (
        <PassVisibleIcon onClick={IsSetVisible} />
      )}
    </InputWrapper>
  );
};

export const CustomInput = ({
  placeholder,
  bgColor,
  type,
  checkbox,
  label,
  border,
  bottomRadius,
  margin,
  withBtn,
  btnText,
  checkboxClicked,
}) => {
  return (
    <InputWrapper>
      <InputBox
        type={type ? type : "text"}
        placeholder={placeholder}
        bgColor={bgColor}
        border={border}
        bottomRadius={bottomRadius}
        margin={margin}
      />
      <CheckBoxWrapper checkbox={checkbox}>
        <CheckBoxLabel>{label}</CheckBoxLabel>
        <CheckBoxBtn type={"checkbox"} onClick={() => checkboxClicked()} />
      </CheckBoxWrapper>
      <Btn withBtn={withBtn}>{btnText}</Btn>
    </InputWrapper>
  );
};

export const ChatInput = () => {
  return (
    <ChatInputWrapper>
      <ChatInputBox placeholder={"Type you message"} />
      <ChatSend />
    </ChatInputWrapper>
  );
};
