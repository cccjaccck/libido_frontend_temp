import React from 'react';
import styled from 'styled-components';
import { PlayerHeader } from './Header';

const Container = styled.div`
    width: ${ p => p.width};
    height: 100vh;
    padding-top: 56px;
`;

const VideoSection = styled.div`
    width: 100%;
    height: 100%;
    background: #4b4b4b;
`;

const Video = styled.img`
    object-fit: contain;
    object-position: center center;
`;

const PlayerFrame = () => {
    const playerWidth = 'calc(100% - 240px)';

    return (
        <Container
            width={playerWidth}
        >
            <PlayerHeader
                width={playerWidth}
            >영화 바닷마을 다이어리 #일본 #가마쿠라</PlayerHeader>
            <VideoSection>
                <Video src={'./img/sampleVideo.png'} />
            </VideoSection>
        </Container>
    );
}

export default PlayerFrame;