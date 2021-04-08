import React, { useState } from 'react';
import styled from 'styled-components';
import MainFriend from './MainComponents/MainFriend';
import MainHot from './MainComponents/MainHot';
import MainMix from './MainComponents/MainMix';
import MainProfile from './MainComponents/MainProfile';
import SlideDock from './MainComponents/SlideDock';
import TabView from './MainComponents/TabView';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${ props => props.theme.themeColor };
    overflow-x: hidden;
`;

const Main = () => {
    const [ isClick, setIsClick ] = useState(0);

    const onClickIsClick = (index) => {
        setIsClick(index)
    }

    return (
        <Container>
            <MainProfile />
            <SlideDock />
            <TabView
                isClick={isClick}
                onClickIsClick={onClickIsClick}
            />
            {
                isClick === 0 ?
                <MainHot /> :
                isClick === 1 ?
                <MainMix /> :
                <MainFriend />
            }
        </Container>
    );
}

export default Main;