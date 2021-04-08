import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import ProfileCircle from './ProfileCircle';

const List = styled.div`
    width: 100%;
    height: 56px;
    display: flex;
    position: relative;
    align-items: center;
    svg {
        width: 24px;
        height: 24px;
        position: absolute;
        top: calc(50% - 12px);
        right: 0;
    }
`;

const UnderLine = styled.div`
    width: 287px;
    height: 1px;
    background: rgba(0, 0, 0, .12);
    position: absolute;
    right: 0;
    bottom: 0;
`;

const Name = styled.div`
    ${ props => props.theme.subTitle1 };
    width: 100%;
    max-width: 255px;
    margin-left: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const FriendList = ({key, imgSource, name}) => {
    const [ isAdd, setIsAdd ] = useState(false); //AddButton

    const onClickSetAdd = () => {
        setIsAdd(!isAdd);
    }

    return (
        <List
            key={key}
        >
            <ProfileCircle
                size={'40px'}
                imgSource={imgSource}
            />
            <Name>{name}</Name>
            {
                isAdd ?
                <AiOutlineMinus
                    onClick={onClickSetAdd}
                    color={ "#999" }
                /> :    
                <AiOutlinePlus
                    onClick={onClickSetAdd}
                    color={ "#A7D8D5" }
                />
            }
            <UnderLine />
        </List>
    );
}

export default FriendList;