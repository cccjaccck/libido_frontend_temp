import React from "react";
import { useReactiveVar } from "@apollo/client";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import MakeRoom from "./components/MakeRoom";
import Player from "./components/Player";
import Setting from "./components/Setting";
import MyStudio from "./components/MyStudio";
import FriendSearch from "./components/FriendSearch";
import Search from "./components/Search";
import {
  MainMoreRecommendation,
  MainMoreStreaming,
} from "./components/MainMore";
import Main from "./components/Main";
import ForgotPassword from "./components/LoginProcess/ForgotPassword";
import Register from "./components/LoginProcess/Register";
import SignIn from "./components/LoginProcess/SignIn";
import Splash from "./components/Splash";
import UserProfile from "./components/UserProfile";
import { isLoggedInVar } from "./apollo";

const MainRoute = (props) => <Main {...props} />;

const RecommendationRoute = (props) => (
  <MainMoreRecommendation pageTitle={"Recommendation"} {...props} />
);

const StreamingRoute = (props) => (
  <MainMoreStreaming pageTitle={"Streaming"} {...props} />
);

const SearchRoute = (props) => <Search {...props} />;

const MyStudioRoute = ({ match }) => (
  <>
    <Route exact path={match.path} component={MyStudio} />
    <Route path={`${match.path}/setting`} component={Setting} />
  </>
);
const UserProfileRoute = (props) => <UserProfile {...props} />;
const MakeRoomRoute = (props) => <MakeRoom {...props} />;
const FriendSearchRoute = (props) => <FriendSearch {...props} />;
const PlayerRoute = (props) => <Player {...props} />;

const LoggedInRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainRoute} />
        <Route path="/mainRecommendation" component={RecommendationRoute} />
        <Route path="/mainStreaming" component={StreamingRoute} />
        <Route path="/search" component={SearchRoute} />
        <Route path="/myStudio" component={MyStudioRoute} />
        <Route path="/makeRoom" component={MakeRoomRoute} />
        <Route path="/friendSearch" component={FriendSearchRoute} />
        <Route path="/player/:id" component={PlayerRoute} />
        <Route path="/user/:id" component={UserProfileRoute} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
};

const LoggedOutRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/signIn" component={SignIn} />
        <Route path="/register" component={Register} />
        <Route path="/forgotPassword" component={ForgotPassword} />
      </Switch>
    </Router>
  );
};

const AppRouter = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />;
};

export default AppRouter;
