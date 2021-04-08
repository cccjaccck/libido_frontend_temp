import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProfileCircle from './ProfileCircle';

const Container = styled.div`
    width: 100%;
    height: fit-content;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
`;

const ProfileContainer = styled.div`
    width: 100px;
    height: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 16px;
    cursor: pointer;
`;

const ProfileWrap = styled.div`
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const StatusCircle = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #fff;
    position: absolute;
    top: 5px;
    right: 5px;
    background: ${ p => p.isOn ? p.theme.themeColor : "#999999" };
`;

const ProfileText = styled.div`
    ${ props => props.theme.bodyFont2 };
    width: 100%;
    height: 16px;
    text-align: center;
    margin-top: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`;

const MainFriend = () => {
    return (
        <Container>
            <Link to="/friendSearch">
                <ProfileContainer>
                    <ProfileWrap>
                        <ProfileCircle
                            addButton={true}
                        />
                    </ProfileWrap>
                    <ProfileText>친구 추가</ProfileText>
                </ProfileContainer>
            </Link>
            <ProfileContainer>
                <ProfileWrap>
                    <ProfileCircle
                        imgSource={'./img/friend1.png'}
                    />
                    <StatusCircle
                        isOn={true}
                    />
                </ProfileWrap>
                <ProfileText>Sebastian Stan</ProfileText>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrap>
                    <ProfileCircle
                        imgSource={'./img/friend2.png'}
                    />
                    <StatusCircle
                        isOn={true}
                    />
                </ProfileWrap>
                <ProfileText>Kaya Scodelasia</ProfileText>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrap>
                    <ProfileCircle
                        imgSource={'./img/friend3.png'}
                    />
                    <StatusCircle
                        isOn={true}
                    />
                </ProfileWrap>
                <ProfileText>Karen Gillan</ProfileText>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrap>
                    <ProfileCircle
                        imgSource={'./img/friend4.png'}
                    />
                    <StatusCircle
                        isOn={true}
                    />
                </ProfileWrap>
                <ProfileText>Gal Gadot</ProfileText>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrap>
                    <ProfileCircle
                        imgSource={'./img/friend5.png'}
                    />
                    <StatusCircle
                        isOn={false}
                    />
                </ProfileWrap>
                <ProfileText>James Edwardolph</ProfileText>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrap>
                    <ProfileCircle
                        imgSource={'./img/friend6.png'}
                    />
                    <StatusCircle
                        isOn={false}
                    />
                </ProfileWrap>
                <ProfileText>Elizabeth Olsen</ProfileText>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrap>
                    <ProfileCircle />
                    <StatusCircle
                        isOn={false}
                    />
                </ProfileWrap>
                <ProfileText>Test1</ProfileText>
            </ProfileContainer>
        </Container>
    );
}

export default MainFriend;