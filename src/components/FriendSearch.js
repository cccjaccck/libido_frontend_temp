import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchButton } from './MainComponents/Buttons';
import FriendList from './MainComponents/FriendList';
import { HeaderSearch } from './MainComponents/Header';

const Container = styled.div`
    width: 100%;
    padding: 0 16px;
    padding-top: 80px;
`;

const friends = [
    { id: 1, name: 'Sebastian Stan', profile: './img/friend1.png' },
    { id: 2, name: 'Karen Gillan', profile: './img/friend3.png' },
    { id: 3, name: 'Gal Gadot', profile: './img/friend4.png' },
    { id: 4, name: 'Elizabeth Olsen', profile: './img/friend6.png' },
]

const FriendSearch = () => {
    const [ isClick, setIsClick ] = useState(false); //HeaderSearch

    const onClickIsClick = () => {
        setIsClick(!isClick)
    }

    const onClickRemove = () => {
        setIsClick(false);
    }

    window.addEventListener('scroll', () => {
        setIsClick(false);
    });

    return (
        <Container>
            <HeaderSearch
                placeholder={'친구를 검색해주세요.'}
                isClick={isClick}
                onClickIsClick={onClickIsClick}
                onClickRemove={onClickRemove}
            >Find Friend</HeaderSearch>
            {
                friends.map( (friend, index) => (
                    <FriendList
                        key={friend.id}
                        imgSource={friend.profile}
                        name={friend.name}
                    />
                ))
            }
            <SearchButton
                isClick={isClick}
                onClickRemove={onClickRemove}
            />
        </Container>
    );
}

export default FriendSearch;