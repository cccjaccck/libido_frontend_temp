import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchButton } from './MainComponents/Buttons';
import { FAB } from './MainComponents/IconPack';
import { HeaderSearch } from './MainComponents/Header';
import { ThumbnailCardHor } from './MainComponents/ThumbnailCard';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    padding: 0 16px;
    padding-top: 80px;
`;

const Search = () => {
    const [ isClick, setIsClick ] = useState(false);

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
                placeholder={'방 제목을 검색해주세요.'}
                isClick={isClick}
                onClickIsClick={onClickIsClick}
                onClickRemove={onClickRemove}
            >Search</HeaderSearch>
            <ThumbnailCardHor
                imgSource={'./img/thumb1.png'}
                title={'좋아하면 울리는 넷플릭스!! 우리 같이 좋알람을 확인해볼까요?'}
                caption={'Chae Yeong In'}
                isHost={true}
            />
            <ThumbnailCardHor
                imgSource={'./img/thumb3.png'}
                title={'Warnerbros Korea_[고질라 VS. 콩] 30초 예고편'}
                caption={'Sebastian Stan'}
                isHost={true}
                isLock={true}
            />
            <ThumbnailCardHor
                imgSource={'./img/thumb4.png'}
                title={'Walt Disney Studios_크루엘라 공식티저영상 같이봐요!'}
                caption={'Gal Gadot'}
                isHost={true}
                isLock={true}
            />
            <ThumbnailCardHor
                imgSource={'./img/thumb2.png'}
                title={'DC 저스티스 리그 가즈아!'}
                caption={'Elizabeth Olsen'}
                isHost={true}
                isAdd={true}
            />
            <Link to="/makeRoom">
                <FAB
                    isClick={isClick}
                />
            </Link>
            <SearchButton
                isClick={isClick}
                onClickRemove={onClickRemove}
            />
        </Container>
    );
}

export default Search;