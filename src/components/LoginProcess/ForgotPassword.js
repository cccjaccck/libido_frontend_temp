import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { H6Button } from '../MainComponents/Buttons';
import { EmailInput } from '../MainComponents/InputBox';
import PageTitle from './PageTitle';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background: ${ props => props.theme.themeColor };
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

const ForgotPassword = () => {
    return (
        <Container>
            <PageTitle>Forgot password?</PageTitle>
            <EmailInput />
            <Link to="/signIn">
                <H6Button
                    marginTop={'40px'}
                >Send E-Mail</H6Button>
            </Link>
        </Container>
    );
}

export default ForgotPassword;