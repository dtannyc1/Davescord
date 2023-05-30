import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignupModal";
import ChannelsPage from "./components/ChannelsPage";
import { useSelector } from "react-redux";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";

// if logged in, redirects should happen on /login and /register

function App() {
    const currentUserId = useSelector(state => state.session.currentUserId);

    return (
        <>
            <Route exact path="/">
                <Splash/>
            </Route>
            <Route path="/login">
                {currentUserId ? <Redirect to="/channels/@me"/> : <LoginModal/>}
            </Route>
            <Route path="/register">
                {currentUserId ? <Redirect to="/channels/@me"/> : <SignUpModal/>}
            </Route>
            <Switch>
                <Route exact path="/channels/@me">
                    {currentUserId ? <ChannelsPage/> : <Redirect to="/login"/>}
                </Route>

                <Route exact path="/channels/@me/:privateChatId">
                    {currentUserId ? <ChannelsPage/> : <Redirect to="/login"/>}
                </Route>

                <Route exact path="/channels/:serverId">
                    {currentUserId ? <ChannelsPage/> : <Redirect to="/login"/>}
                </Route>

                <Route exact path="/channels/:serverId/:channel_id">
                    {currentUserId ? <ChannelsPage/> : <Redirect to="/login"/>}
                </Route>
            </Switch>
        </>
    );
}

export default App;
