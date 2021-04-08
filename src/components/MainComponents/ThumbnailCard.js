import React from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdLock } from 'react-icons/md';
import { ListPlay, ListPlus } from './Buttons';
import { Link } from 'react-router-dom';

const ThumbnailCardVertical = styled.div`
    width: 240px;
    height: 206px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 0 0 auto;
    margin-right: 16px;
`;

const ThumbnailCardHorizontal = styled.div`
    width: 100%;
    height: 107px;
    display: flex;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
    margin-bottom: 16px;
    > svg {
        width: 24px;
        height: 24px;
        color: #999;
        position: absolute;
        right: 0;
        bottom: 12px;
    }
`;

const Thumbnail = styled.img`
    display: block;
    width: ${ p => p.isHorizontal ? '160px' : '100%' };
    height: ${ p => p.isHorizontal ? '90px' : '140px' };
    object-fit: cover;
    object-position: center center;
`;

const HorizontalTextWrap = styled.div`
    width: 151px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 8px;
`;

const TitleText = styled.div`
    ${ props => props.theme.bodyFont2 };
    height: ${ p => p.isHorizontal ? '60px' : '40px' };
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${ p => p.isHorizontal ? '3' : '2' };
    text-overflow: ellipsis;
    overflow: hidden;
`;

const CaptionText = styled.div`
    ${ props => props.theme.caption };
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #8D8497;
`;

const RoomThumbnailCard = styled.div`
    width: 176px;
    height: 170px;
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    margin: 0 ${
        p => p.isSelect ? "16px" : "0"
    };
    :first-of-type {
        margin-left: 0;    
    };
    transition: all ease-in-out .2s;
`;

const RoomThumbnailImage = styled.img`
    display: block;
    width: 160px;
    height: 90px;
    object-fit: contain;
    object-position: center center;
    border-radius: 8px;
    z-index: 2;
    margin: 0 auto;
    margin-top: 8px;
`;

const RoomThumbnailOverlay = styled.div`
    width: 160px;
    height: 90px;
    border-radius: 8px;
    position: absolute;
    top: 8px;
    left: 8px;
    z-index: 3;
    background: rgba(0, 0, 0, .3);
`;

const RoomThumbnailTitle = styled.div`
    ${ props => props.theme.caption}
    width: 160px;
    margin: 0 auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
    z-index: 2;
`;

const RoomThumbnailCaption = styled.div`
    ${ props => props.theme.caption };
    width: 160px;
    margin: 0 auto;
    margin-bottom: 8px;
    z-index: 2;
`;

const SelectedOverlay = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: #92DFAE;
    position: absolute;
    left: 0;
    top: 0;
    display: ${
        p => p.isSelect ? "block" : "none"
    };
`;

export const ThumbnailCardVert = ({imgSource, title, caption}) => {
    return (
        <Link to="/player">
            <ThumbnailCardVertical>
                <Thumbnail
                    src={imgSource}
                />
                <TitleText>{title}</TitleText>
                <CaptionText>{caption}</CaptionText>
            </ThumbnailCardVertical>
        </Link>
    );
}

export const ThumbnailCardHor = ({imgSource, title, caption, isLock, isAdd, isHost}) => {
    return (
        <ThumbnailCardHorizontal>
            <Thumbnail
                isHorizontal={true}
                src={imgSource}
            />
            <HorizontalTextWrap>
                <TitleText
                    isHorizontal={true}
                >{title}</TitleText>
                <CaptionText>
                    {caption}
                    {isHost && '(guestCount)'}
                </CaptionText>
            </HorizontalTextWrap>
            {
            isLock ?
            <MdLock /> :
            isAdd ?
            <AiOutlinePlus /> :
            null
            }
        </ThumbnailCardHorizontal>
    );
}

export const RoomThumbnail = ({imgSource, title, publisher, isHistory, historyTitle, date, id, onClick, playList}) => {

    const isSelect = playList.filter(video => video.id === id).length !== 0;

    return (
        <RoomThumbnailCard
            isSelect={isSelect}
        >
            <RoomThumbnailImage
                src={imgSource}
                isRoom={true}
            />
            {
                isHistory ?
                <>
                <RoomThumbnailTitle>{historyTitle}</RoomThumbnailTitle>
                <RoomThumbnailCaption>{date}</RoomThumbnailCaption>
                </>
                :
                <>
                <RoomThumbnailTitle>{title}</RoomThumbnailTitle>
                <RoomThumbnailCaption>{publisher}</RoomThumbnailCaption>
                </>
            }
            <RoomThumbnailOverlay />
            {
                isSelect ?
                <ListPlay
                    top={'25px'}
                    onClick={ () => {
                         onClick(id)
                    }}
                />
                :
                <ListPlus
                    top={'25px'}
                    onClick={ () => {
                         onClick(id)
                    }}
                />
            }
            <SelectedOverlay
                isSelect={isSelect}
            />
        </RoomThumbnailCard>
    );
}