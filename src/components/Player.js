import React from 'react';
import styled from 'styled-components';
import PlayerChat from './MainComponents/PlayerChat';
import PlayerFrame from './MainComponents/PlayerFrame';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Player = () => {
    return (
        <Container>
            <PlayerFrame />
            <PlayerChat />
        </Container>
    );
}

export default Player;