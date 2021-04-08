import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ThumbnailCardVert } from './ThumbnailCard';

const Container = styled.div`
    width: 100%;
    height: fit-content;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const SectionTitle = styled.div`
    ${ props => props.theme.subtitle1 };
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid;
    margin-bottom: 16px;
`;

const ViewAllBtn = styled.button`
    ${ props => props.theme.bodyFont2 };
    height: 14px;
`;

const Section = styled.section`
    width: calc(100%);
    height: fit-content;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    overflow-x: auto;
    margin-bottom: 16px;
`;

const MainHot = () => {
    return (
        <Container>
            <SectionTitle>
                Recommendation
                <Link to="/mainRecommendation">
                    <ViewAllBtn>
                        모두 보기
                    </ViewAllBtn>
                </Link>
            </SectionTitle>
            <Section>
                <ThumbnailCardVert
                    imgSource={'./img/thumb1.png'}
                    title={'[김소현, 정가람, 송강] 좋아하면 울리는 시즌2 | 공식 예고편 | 넷플릭스'}
                    caption={'Netflix Korea'}
                />
                <ThumbnailCardVert
                    imgSource={'./img/thumb2.png'}
                    title={'Zack Snyder\'s Justice League | Official Trailer | HBO Max'}
                    caption={'HBO Max'}
                />
            </Section>
            <SectionTitle>
                Streaming
                <Link to="/mainStreaming">
                    <ViewAllBtn>
                        모두 보기
                    </ViewAllBtn>
                </Link>
            </SectionTitle>
            <Section>
                <ThumbnailCardVert
                    imgSource={'./img/thumb3.png'}
                    title={'[고질라 VS. 콩] 30초 예고편'}
                    caption={'Warnerbros Korea'}
                />
                <ThumbnailCardVert
                    imgSource={'./img/thumb4.png'}
                    title={'Disney\'s Cruella | Official Trailer'}
                    caption={'Walt Disney Studios'}
                />
            </Section>
        </Container>
    );
}

export default MainHot;