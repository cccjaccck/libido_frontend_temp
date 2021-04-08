import React from 'react';
import styled from 'styled-components';
import ProfileCircle from './ProfileCircle';

const Container = styled.div`
    width: 100%;
    height: 142px;
    padding: 16px 16px 8px 16px;
    background: #D8D8D8;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const UserName = styled.div`
    ${ props => props.theme.h6 };
    height: 22px;
    width: 100%;
    text-align: center;
`;

const BottomWrap = styled.div`
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CountWrap = styled.div`
    ${ props => props.theme.caption };
    color: ${ props => props.theme.themeColorRed };
    text-align: center;
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Count = styled.div`
    ${ props => props.theme.h6 };
    margin-bottom: 8px;
`;

const ProfileWrap = styled.div`
    position: relative;
`;

const AlarmCount = styled.div`
    ${ props => props.theme.overline };
    line-height: 14px;
    letter-spacing: 0;
    color: #fff;
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 50%;
    background: ${ props => props.theme.themeColorRed };
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainProfile = () => {
    return (
        <Container>
            <UserName>Chae Yeong In</UserName>
            <BottomWrap>
                <CountWrap>
                    <Count>
                        552h
                    </Count>
                    Views
                </CountWrap>
                <ProfileWrap>
                    <ProfileCircle
                        imgSource={'./img/sampleProfile.png'}
                    />
                    <AlarmCount>1</AlarmCount>
                </ProfileWrap>
                <CountWrap>
                    <Count>
                        40k
                    </Count>
                    Friends
                </CountWrap>
            </BottomWrap>
        </Container>
    );
}

export default MainProfile;