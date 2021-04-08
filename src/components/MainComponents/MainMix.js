import React from 'react';
import styled from 'styled-components';
import NotYetText from './NotYetText';

const Container = styled.div`
    width: 100%;
    height: fit-content;
    padding: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainMix = () => {
    return (
        <Container>
            <NotYetText marginTop={'33px'}>
                준비중인 서비스입니다.
            </NotYetText>
        </Container>
    );
}

export default MainMix;