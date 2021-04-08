import React, { useState } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import MakeRoom from './components/MakeRoom';
import Player from './components/Player';
import Setting from './components/Setting';
import MyStudio from './components/MyStudio';
import FriendSearch from './components/FriendSearch';
import Search from './components/Search';
import MainMore from './components/MainMore';
import Main from './components/Main';
import ForgotPassword from './components/LoginProcess/ForgotPassword';
import Register from './components/LoginProcess/Register';
import SignIn from './components/LoginProcess/SignIn';
import Splash from './components/Splash';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background: #fff;
  @media only screen and ( min-width: 425px ) {
    width: 425px;
    margin: 0 auto;
    box-shadow: 0 3px 6px rgba(0, 0, 0, .12);
  }
`;

const PlayerContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #ff0000;
`;

const LoggedInRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Container>
                        <Main />
                    </Container>
                </Route>
                <Route path="/mainRecommendation">
                    <Container>
                        <MainMore
                            pageTitle={'Recommendation'}
                        />
                    </Container>
                </Route>
                <Route path="/mainStreaming">
                    <Container>
                        <MainMore
                            pageTitle={'Streaming'}
                        />
                    </Container>
                </Route>
                <Route path="/search">
                    <Container>
                        <Search />
                    </Container>
                </Route>
                <Route path="/myStudio">
                    <Container>
                        <MyStudio />
                    </Container>
                </Route>
                <Route path="/makeRoom">
                    <Container>
                        <MakeRoom />
                    </Container>
                </Route>
                <Route path="/friendSearch">
                    <Container>
                        <FriendSearch />
                    </Container>
                </Route>
                <Route path="/setting">
                    <Container>
                        <Setting />
                    </Container>
                </Route>
                <Route path="/player">
                    <PlayerContainer>
                        <Player />
                    </PlayerContainer>
                </Route>
                <Redirect from="*" to="/" />
            </Switch>
        </Router>
    )
};

const LoggedOutRoutes = ({ isLoggedIn, onClick}) => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Container>
                        <Splash />
                    </Container>
                </Route>
                <Route path="/signIn">
                    <Container>
                        <SignIn
                            isLoggedIn={isLoggedIn}
                            onClick={onClick}
                        />
                    </Container>
                </Route>
                <Route path="/register">
                    <Container>
                        <Register />
                    </Container>
                </Route>
                <Route path="/forgotPassword">
                    <Container>
                        <ForgotPassword />
                    </Container>
                </Route>
            </Switch>
        </Router>
    );
}

const AppRouter = () => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const onClickLoggedInTrue = () => {
        setIsLoggedIn(true);
    }

    return isLoggedIn ? 
        <LoggedInRoutes /> 
        :
        <LoggedOutRoutes
            isLoggedIn={isLoggedIn}
            onClick={onClickLoggedInTrue}
        />;
}

export default AppRouter;