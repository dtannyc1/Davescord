import { Route } from "react-router-dom";
import Splash from "./components/Splash";


function App() {
    return (
        <>
            <Route exact path="/">
                <Splash/>
            </Route>
        </>
    );
}

export default App;
