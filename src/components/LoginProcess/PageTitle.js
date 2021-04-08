import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    ${ props => props.theme.h4 };
    width: 100%;
    height: 35px;
    margin-top: 80px;
    margin-bottom: 40px;
    text-align: center;
    color: #fff;
`;

const PageTitle = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    );
}

export default PageTitle;