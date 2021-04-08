import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

const Container = styled.button`
    ${ props => props.theme.h6 };
    color: ${ props => props.color ? props.color : props.theme.themeColorBlue };
    width: 328px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${ props => props.backgroundColor ? props.backgroundColor : '#fff'};
    border-radius: 6px;
    margin: 8px;
    margin-top: ${ props => props.marginTop ? props.marginTop : '8px'};
`;

const SearchContainer = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #92DFAE, #80D9C4 );
    position: fixed;
    bottom: ${ p => p.isClick ? '0' : '-48px'};
    left: 0;
    transition: all ease-in-out .3s;
`;

const SearchText = styled.div`
    ${ props => props.theme.subTitle1 };
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: 24px;
        height: 24px;
        color: #fff;
        margin-right: 8px;
    }
`;

const ListIconWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    position: absolute;
    top: ${ p => p.top ? p.top : 'calc(50% - 20px)' };
    left: calc(50% - 20px);
    z-index: 4;
`;

const ListIcon = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        width: ${ p => p.size };
        height: ${ p => p.size };
        color: ${ p => p.color };
    }
`;

export const H6Button = ({children, marginTop, backgroundColor, color, onClick}) => {
    return (
        <Container
            marginTop={marginTop}
            backgroundColor={backgroundColor}
            color={color}
            onClick={onClick}
        >
            {children}
        </Container>
    );
}

export const SearchButton = ({isClick, onClickRemove}) => {
    return (
        <SearchContainer
            isClick={isClick}
            onClick={onClickRemove}
        >
            <SearchText>
                <MdSearch />
                SEARCH
            </SearchText>
        </SearchContainer>
    )
}

export const ListPlus = ({top, onClick}) => {
    return (
        <ListIconWrapper
            top={top}
            onClick={onClick}
        >
            <ListIcon>
                <AiOutlinePlus
                    size={'24px'}
                    color={'#A7D8D5'}
                />
            </ListIcon>
        </ListIconWrapper>
    )
}

export const ListPlay = ({top, onClick}) => {
    return (
        <ListIconWrapper
            top={top}
            onClick={onClick}
        >
            <ListIcon>
                <FaPlay
                    size={'10px'}
                    color={'#FF6128'}
                />
            </ListIcon>
        </ListIconWrapper>
    )
}