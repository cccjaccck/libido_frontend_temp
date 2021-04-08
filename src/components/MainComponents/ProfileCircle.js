import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: ${ p => p.size ? p.size : '80px'};
    height: ${ p => p.size ? p.size : '80px'};
    border-radius: 50%;
    overflow: hidden;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
`;

const ProfileCircle = ({imgSource, addButton, size }) => {
    return (
        <Container
            size={size}
        >
            <ProfileImage
                src={
                    imgSource ? imgSource : addButton ? './img/addFriend.svg' : './img/defaultProfile.svg'
                }
            />
        </Container>
    );
}

export default ProfileCircle;