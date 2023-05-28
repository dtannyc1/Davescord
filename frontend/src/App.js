import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import LoginModal from "./components/LoginModal";


function App() {
    return (
        <>
            <Route exact path="/">
                <Splash/>
            </Route>
            <Route path="/login">
                <LoginModal/>
            </Route>
        </>
    );
}

export default App;
