import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignupModal";
import ChannelsPage from "./components/ChannelsPage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import WebSocketListeners from "./components/ChannelsPage/WebSocketListeners";
import { useState, createContext } from "react";

// if logged in, redirects should happen on /login and /register

export const WebsocketContext = createContext(true);

function App() {
    const currentUserId = useSelector(state => state.session.currentUserId);
    const subscribedServers = useSelector(state => Object.values(state.servers));
    const [websocketRestart, setWebsocketRestart] = useState(true);

    return (
        <WebsocketContext.Provider value={websocketRestart}>
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
                {currentUserId ?
                    <ChannelsPage setWebsocketRestart={setWebsocketRestart}/>
                    : <Redirect to="/login"/>}
            </Route>
            {/* {(subscribedServers && subscribedServers.length > 0) ?
                    <WebSocketListeners websocketRestart={websocketRestart} setWebsocketRestart={setWebsocketRestart}/>
                 : null} */}
        </WebsocketContext.Provider>
    );
}

export default App;
