import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    max-width: 425px;
    height: 32px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    position: relative;
    overflow-x: auto;
`;

const Tab = styled.div`
    ${ props => props.theme.subTitle1 };
    width: fit-content;
    height: 32px;
    border-radius: 16px;
    padding: 6px 12px;
    margin-right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    color: rgba(255, 255, 255, .87);
    background: #d9acb2;
    /* background: ${ p => p.value ?  "linear-gradient( .65turn, #fe5266 0%, #fe5465 45.48%, #fd7f54 100%)" : "#D9ACB2" }; */
    border: 1px solid rgba(0, 0, 0, .12);
    cursor: pointer;
    &.active {
        background: linear-gradient( .65turn, #fe5266 0%, #fe5465 45.48%, #fd7f54 100%)
    }
`;

const TabScrollView = () => {
    // const tabList = ['Youtube', 'Netflix', 'Watcha', 'Amazon Prime'];
    const tabList = ['Netflix', 'Watcha', 'Amazon Prime'];
    return (
        <Container>
            <Tab className={'active'}>
                Youtube
            </Tab>
            {
                tabList.map((item, index) => (
                    <Tab
                        key={index}
                    >
                        {item}
                    </Tab>
                ))
            }
        </Container>
    );
}

export default TabScrollView;