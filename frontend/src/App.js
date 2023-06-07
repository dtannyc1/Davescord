import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignupModal";
import ChannelsPage from "./components/ChannelsPage";
import { useSelector } from "react-redux";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import WebSocketListeners from "./components/ChannelsPage/WebSocketListeners";

// if logged in, redirects should happen on /login and /register

function App() {
    const currentUserId = useSelector(state => state.session.currentUserId);
    const subscribedServers = useSelector(state => Object.values(state.servers));

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
            <Route path="/channels/:serverId/:channelId?">
                {currentUserId ? <ChannelsPage/> : <Redirect to="/login"/>}
            </Route>
            {(subscribedServers && subscribedServers.length > 0) ? <WebSocketListeners/> : null}
        </>
    );
}

export default App;
