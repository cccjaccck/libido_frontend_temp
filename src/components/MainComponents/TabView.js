import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 48px;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const Tab = styled.div`
    ${ props => props.theme.subTitle1 };
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${ p => p.value ? p.theme.themeColorViolet : '#707070' };
    cursor: pointer;
`;

const UnderLine = styled.div`
    width: 100px;
    height: 1px;
    background: ${ props => props.theme.themeColorViolet };
    position: absolute;
    bottom: 0;
    transition: all ease-in-out .3s;
    left: ${
        p => p.value === 0 ? '16px' : p.value === 1 ? 'calc(50% - 50px)' : 'calc(100% - 116px)'
    };
`;

const TabView = ({isClick, onClickIsClick}) => {
    const tabList = ['HOT', 'Mix', 'Friend'];

    return (
        <Container>
            {
                tabList.map((item, index) => (
                    <Tab
                        key={index}
                        value={index === isClick}
                        onClick={() => onClickIsClick(index)}
                    >
                        {item}
                    </Tab>
                ))
            }
            <UnderLine
                value={isClick}
            />
        </Container>
    );
}

export default TabView;