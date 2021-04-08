import React from 'react';
import styled from 'styled-components';
import { H6Button } from './MainComponents/Buttons';
import { HeaderNoBtn } from './MainComponents/Header';
import { CustomInput, PassInput } from './MainComponents/InputBox';

const Container = styled.div`
    width: 100%;
    padding: 0 16px;
    padding-top: 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Setting = () => {
    return (
        <Container>
            <HeaderNoBtn>Setting</HeaderNoBtn>
            <CustomInput placeholder={'Username'} />
            <PassInput placeholder={'Password'} />
            <PassInput placeholder={'Confirm Password'} />
            <H6Button
                backgroundColor={ props => props.theme.themeColor }
                color={'#fff'}
                marginTop={'40px'}
            >저장하기</H6Button>
            <H6Button
                backgroundColor={ props => props.theme.themeColor }
                color={'#fff'}
                marginTop={'24px'}
            >로그아웃</H6Button>
        </Container>
    );
}

export default Setting;