import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { H6Button } from './MainComponents/Buttons';
import { HeaderSearch } from './MainComponents/Header';
import { CustomInput, PassInput } from './MainComponents/InputBox';
import RoomPlayList from './MainComponents/RoomPlayList';
import TabScrollView from './MainComponents/TabScrollView';
import { RoomThumbnail } from './MainComponents/ThumbnailCard';

const Container = styled.div`
    width: 100%;
    padding: 0 16px;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SectionTitle = styled.div`
    width: 100%;
    height: 48px;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
    display: flex;
    align-items: center;
    margin-top: 24px;
`;

const SectionThumbnail = styled.div`
    ${ props => props.theme.subTitle1 };
    color: #999;
    width: 100%;
    height: 170px;
    display: flex;
    overflow-x: auto;
    justify-content: ${ p => p.isHistory ? 'unset' : 'center' };
    align-items: ${ p => p.isHistory ? 'unset' : 'center' };
    margin-top: 8px;
`;

const SectionPlayList = styled.div`
    ${ props => props.theme.subTitle1 };
    letter-spacing: -0.02em;
    color: #999;
    width: 100%;
    min-height: 21px;
    max-height: 240px;
    margin-top: 16px;
`;

const SectionRoomSetting = styled.div`
    margin-top: 12px;
    margin-bottom: 38px;
`;

const videoList = [
    {
        id: 1,
        title: '[김소현, 정가람, 송강] 좋아하면 울리는 시즌2 | 공식 예고편 | 넷플릭스',
        publisher: 'Netflix Korea',
        img: './img/thumb1.png',
        date: '1일 전',
    },
    {
        id: 2,
        title: 'Zack Snyder\'s Justice League | Official Trailer | HBO Max',
        publisher: 'HBO Max',
        img: './img/thumb2.png',
        date: '2일 전',
    },
    {
        id: 3,
        title: 'Disney\'s Cruella | Official Trailer',
        publisher: 'Walt Disney Studios',
        img: './img/thumb4.png',
        date: '3일 전',
    },
    {
        id: 4,
        title: '[고질라 VS. 콩] 30초 예고편',
        publisher: 'Warnerbros Korea',
        img: './img/thumb3.png',
        date: '5일 전',
    },
];

const MakeRoom = () => {
    //HeaderSearch//
    const [ isClick, setIsClick ] = useState(false);

    const onClickIsClick = () => {
        setIsClick(!isClick)
    };

    const onClickRemove = () => {
        setIsClick(false);
    };

    window.addEventListener('scroll', () => {
        setIsClick(false);
    });

    //RoomPlayList//
    const [ playList, setPlayList ] = useState([]);

    const onClick = (id) => {
        if (playList.length === 3 && !(videoList.filter(video => video.id === id)[0] === playList.filter(video => video.id === id)[0])) {
            alert('영상은 최대 3개까지 가능해요!');
            return ;
        }
        if (playList.filter(video => video.id === id).length === 0) {
            setPlayList(playList.concat(videoList.filter(video => video.id === id)));
        } else {
            setPlayList(playList.filter(video => video.id !== id))
        }
    }
    const onClickRemoveBtn = (id) => {
        setPlayList(playList.filter(video => video.id !== id))
    }

    //hasHistory
    const isHistory = true;

    //checkBoxClick
    const [ checkboxClick, setCheckboxClick ] = useState(false);

    const checkboxClicked = () => {
        setCheckboxClick(!checkboxClick)
    }

    //atSearchUI
    const [ isSearch, setIsSearch ] = useState(false);

    const onKeyPressTest = (e) => {
        if ( e.key === 'Enter' ) {
            setIsSearch(!isSearch)
        }
    }

    const onPointerOutTest = () => {
        setIsSearch(false);
    }

    return (
        <Container>
            <HeaderSearch
                placeholder={'영상 제목을 검색해주세요.'}
                isClick={isClick}
                onClickIsClick={onClickIsClick}
                onClickRemove={onClickRemove}
                onKeyPress={onKeyPressTest}
                onPointerOut={onPointerOutTest}
            >Make</HeaderSearch>
            <TabScrollView />
            <SectionTitle>
                {
                    isSearch ? "검색결과" : "최근기록"
                }
            </SectionTitle>
            <SectionThumbnail
                isHistory={isHistory}
                style={{
                    overflow: 'auto'
                }}
            >
                {
                    isSearch ?
                    videoList.map((video) => (
                        <RoomThumbnail
                            key={video.id}
                            id={video.id}
                            imgSource={video.img}
                            title={video.title}
                            publisher={video.publisher}
                            playList={playList}
                            onClick={onClick}
                        />
                    ))
                    :
                    isHistory ?
                    videoList.map((video) => (
                        <RoomThumbnail
                            key={video.id}
                            id={video.id}
                            imgSource={video.img}
                            historyTitle={`${video.publisher}_${video.title}`}
                            date={video.date}
                            isHistory={isHistory}
                            onClick={onClick}
                            playList={playList}
                        />
                    ))
                    :
                    '최근 기록이 없습니다.'
                }
            </SectionThumbnail>
            <SectionTitle>플레이리스트</SectionTitle>
            <SectionPlayList>
                {
                    playList.length !== 0 ?
                    playList.map((item) => (
                         <RoomPlayList
                            key={item.id}
                            id={item.id}
                            imgSource={item.img}
                            publisher={item.publisher}
                            title={item.title}
                            onClickRemoveBtn={onClickRemoveBtn}
                        />
                    ))
                    :
                    playList.length === 0 && "현재 추가된 영상이 없습니다. (3개까지 선택가능)"
                }
            </SectionPlayList>
            <SectionTitle>파티룸 설정</SectionTitle>
            <SectionRoomSetting>
                <CustomInput
                    placeholder={'방이름'}
                    bgColor={'rgba(255, 255, 255, 0)'}
                    border={'1px solid rgba(0, 0, 0, .12)'}
                    bottomRadius={'4px'}
                    label={'비밀방'}
                    checkbox={true}
                    margin={'12px 8px'}
                    checkboxClicked={checkboxClicked}
                />
                {
                    checkboxClick &&
                    <PassInput
                        placeholder={'비밀번호'}
                        bgColor={'rgba(255, 255, 255, 0)'}
                        border={'1px solid rgba(0, 0, 0, .12)'}
                        bottomRadius={'4px'}
                        margin={'12px 8px'}
                    />
                }
                <CustomInput
                    placeholder={'URL 주소'}
                    bgColor={'rgba(255, 255, 255, 0)'}
                    border={'1px solid rgba(0, 0, 0, .12)'}
                    bottomRadius={'4px'}
                    margin={'12px 8px'}
                    withBtn={true}
                    btnText={'가져오기'}
                />
                <Link to="/player">
                    <H6Button
                        backgroundColor={ props => props.theme.themeColor }
                        color={'#fff'}
                        marginTop={'12px'}
                    >
                        만들기
                    </H6Button>
                </Link>
            </SectionRoomSetting>
        </Container>
    );
}

export default MakeRoom;