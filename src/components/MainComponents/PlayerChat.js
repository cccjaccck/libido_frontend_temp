import React from 'react';
import styled from 'styled-components';
import { ChatMessageMy, ChatMessageOther } from './ChatMessage';
import { ChatInput } from './InputBox';
import ProfileCircle from './ProfileCircle';

const Container = styled.div`
    width: 240px;
    padding: 0 12px;
    height: 100vh;
    background: #fff;
    overflow: hidden;
`;

const ProfileHeader = styled.div`
    width: calc(100% + 12px);
    height: 54px;
    display: flex;
    align-items: center;
    overflow-x: auto;
`;

const ProfileCircleWrapper = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${ p => p.isMy ? "linear-gradient(#fe5266 0%, #fe5465 45.48%, #fd7f54 100%)" : "linear-gradient(#92dfae 0%, #80d9c4 100%)" };
    margin-left: 8px;
    :first-of-type {
        margin-left: 0;
    }
    flex: 0 0 auto;
`;

const ChatSection = styled.div`
    width: 100%;
    height: calc(100% - 54px);
    overflow-y: auto;
    padding-bottom: 56px;
`;

const PlayerChat = () => {
    return (
        <Container>
            <ProfileHeader>
                <ProfileCircleWrapper
                    isMy={true}
                >
                    <ProfileCircle
                        imgSource={'./img/sampleProfile.png'}
                        size={'36px'}
                    />
                </ProfileCircleWrapper>
                <ProfileCircleWrapper>
                    <ProfileCircle
                        imgSource={'./img/friend1.png'}
                        size={'36px'}
                    />
                </ProfileCircleWrapper>
            </ProfileHeader>
            <ChatSection>
                <ChatMessageOther
                    img={'./img/friend1.png'}
                    date={'오후 6:03'}
                >we have to assign new member
                </ChatMessageOther>
                <ChatMessageOther
                    img={'./img/friend1.png'}
                    date={'오후 6:04'}
                >Lorem ipsum dolor sit amet elit.
                </ChatMessageOther>
                <ChatMessageMy
                    img={'./img/sampleProfile.png'}
                    date={'오후 6:04'}
                >It is a long established fact that a read will be distracted
                </ChatMessageMy>
                <ChatMessageMy
                    img={'./img/sampleProfile.png'}
                    date={'오후 6:07'}
                >Richard McClintock, a Latin professor at Hampden-Sydney
                </ChatMessageMy>
            </ChatSection>
            <ChatInput />
        </Container>
    );
}

export default PlayerChat;