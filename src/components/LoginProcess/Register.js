import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { H6Button } from '../MainComponents/Buttons';
import { EmailInput, CustomInput, PassInput } from '../MainComponents/InputBox';
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

const Register = () => {
    return (
        <Container>
            <PageTitle>Register</PageTitle>
            <EmailInput />
            <CustomInput placeholder={'Username'} />
            <PassInput placeholder={'Password'} />
            <PassInput placeholder={'Confirm Password'} />
            <Link to="/signIn">
                <H6Button marginTop={'24px'}>REGISTER</H6Button>
            </Link>
        </Container>
    );
}

export default Register;