import React from 'react';
import styled from 'styled-components';
import { Logo } from './MainComponents/IconPack';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Splash = () => {

    setTimeout(() => {
        window.location.replace('/signIn');
    }, 3000);
    
    return (
        <Container>
            <Logo />
        </Container>
    );
}

export default Splash;