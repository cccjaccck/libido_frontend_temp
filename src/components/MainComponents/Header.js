import React from 'react';
import styled from 'styled-components';
import { MdArrowBack, MdSettings, MdSearch } from 'react-icons/md';
import { withRouter } from 'react-router';

const Container = styled.div`
    width: 100%;
    max-width: 425px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
    @media only screen and ( min-width: 425px ) {
        left: calc(50% - 212.5px);
    }
`;

const UnderLine = styled.div`
    width: calc(100% - 16 * 2px);
    height: 1px;
    background: rgba(0, 0, 0, .12);
    position: absolute;
    bottom: 0;
    left: 16px;
`;

const Title = styled.div`
    ${ props => props.theme.h6 };
    color: ${ props => props.theme.themeColor };
    width: 100%;
    height: 56px;
    position: ${ p => p.isPlayer ? "static" : "absolute" };
    left: 0;
    top: 0;
    display: flex;
    justify-content: ${ p => p.isPlayer ? "flex-start" : "center" };
    align-items: center;
    margin-left: ${ p => p.isPlayer ? "16px" : "inherit" };
`;

const Search = styled.input`
    ${ props => props.theme.bodyFont2 };
    color: #999;
    width: ${ p => p.isClick ? 'calc(100% - 72px)' : '0' };
    opacity: ${ p => p.isClick ? '1' : '0' };
    height: 40px;
    border-radius: 20px;
    border: none;
    background: #fff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .2);
    position: absolute;
    right: 16px;
    top: calc(50% - 20px);
    padding-left: 16px;
    padding-right: 46px;
    transition: all ease-in-out .3s;
    ::placeholder {
        color: #999;
    }
`;

const Overlay = styled.div`
    width: 100vw;
    height: calc(100vh - 48px);
    position: fixed;
    top: 0;
    left: 0;
    display: ${ p => p.isClick ? 'block' : 'none' };
    z-index: 1;
`;

const PlayerHeaderContainer = styled.div`
    width: ${ p => p.width? p.width : '100%' };
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 16px;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
`;

export const HeaderNoBtn = withRouter(({children, history}) => {
    const goBack = () => {
        history.go(-1)
    }

    return (
        <Container>
            <UnderLine />
            <MdArrowBack
                style={{
                    zIndex: '999'
                }}
                size={24}
                color={'#4C5264'}
                onClick={goBack}
            />
            <Title>{children}</Title>
        </Container>
    );
})

export const HeaderWithSetting = withRouter(({children, history}) => {
    const goBack = () => {
        history.go(-1)
    }

    return (
        <Container>
            <UnderLine />
            <MdArrowBack
                style={{
                    zIndex: '999'
                }}
                size={24}
                color={'#4C5264'}
                onClick={goBack}
            />
            <Title>{children}</Title>
            <MdSettings
                size={24}
                color={'#4C5264'}
            />
        </Container>
    );
})

export const HeaderSearch = withRouter(({children, placeholder, isClick, onClickIsClick, onClickRemove, onKeyPress, onChange, isValue, onPointerOut, history}) => {

    const goBack = () => {
        history.go(-1)
    }

    return (
        <>
        <Overlay
            isClick={isClick}
            onClick={onClickRemove}
        />
        <Container>
            <UnderLine />
            <MdArrowBack
                style={{
                    zIndex: '999'
                }}
                size={24}
                color={'#4C5264'}
                onClick={goBack}
            />
            <Title>{children}</Title>
            <Search
                value={isValue}
                type={'text'}
                placeholder={
                    placeholder ?
                    placeholder : '검색어를 입력해주세요.'
                }
                isClick={isClick}
                onKeyPress={onKeyPress}
                onPointerOut={onPointerOut}
                onChange={onChange}
            />
            <MdSearch
                size={24}
                color={'#4C5264'}
                style={{
                    transition: 'all ease-in-out .3s',
                    position: 'relative',
                    right: isClick ? '17px' : '0'
                }}
                onClick={onClickIsClick}
            />
        </Container>
        </>
    );
});

export const PlayerHeader = withRouter(({children, width, history}) => {
    const goBack = () => {
        history.go(-1)
    }

    return (
        <PlayerHeaderContainer
            width={width}
        >
            <UnderLine />
            <MdArrowBack
                style={{
                    zIndex: '999'
                }}
                size={24}
                color={'#4C5264'}
                onClick={goBack}
            />
            <Title
                isPlayer={true}
            >{children}</Title>
        </PlayerHeaderContainer>
    );
})