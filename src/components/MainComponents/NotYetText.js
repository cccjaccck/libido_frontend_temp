import React from 'react';
import styled from 'styled-components';

const Text = styled.div`
    ${ props => props.theme.h6 };
    width: 100%;
    max-height: 100%;
    margin-top: ${ p => p.marginTop ? p.marginTop : 'inherit' };
    text-align: center;
`;

const NotYetText = ({children, marginTop}) => {
    return (
        <Text
            marginTop={marginTop}
        >
            {children}
        </Text>
    );
}

export default NotYetText;