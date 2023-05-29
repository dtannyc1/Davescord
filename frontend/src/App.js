import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignupModal";


function App() {
    return (
        <>
            <Route exact path="/">
                <Splash/>
            </Route>
            <Route path="/login">
                <LoginModal/>
            </Route>
            <Route path="/register">
                <SignUpModal/>
            </Route>
        </>
    );
}

export default App;
