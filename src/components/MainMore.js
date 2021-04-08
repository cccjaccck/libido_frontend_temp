import React from 'react';
import styled from 'styled-components';
import { HeaderNoBtn } from './MainComponents/Header';
import { ThumbnailCardHor } from './MainComponents/ThumbnailCard';

const Container = styled.div`
    width: 100%;
    padding: 0 16px;
    padding-top: 80px;
`;

const MainMore = ({pageTitle}) => {
    return (
        <Container>
            <HeaderNoBtn>{
                pageTitle ? pageTitle : 'Page Title'
            }</HeaderNoBtn>
            <ThumbnailCardHor
                imgSource={'./img/thumb1.png'}
                title={'[김소현, 정가람, 송강] 좋아하면 울리는 시즌2 | 공식 예고편 | 넷플릭스'}
                caption={'Netflix Korea'}
                isAdd={true}
            />
            <ThumbnailCardHor
                imgSource={'./img/thumb2.png'}
                title={'Zack Snyder\'s Justice League | Official Trailer | HBO Max'}
                caption={'HBO Max'}
                isAdd={true}
            />
        </Container>
    );
}

export default MainMore;