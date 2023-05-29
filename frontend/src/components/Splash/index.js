import NavBar from "./NavBar";
import Tile1 from "./Tile1";
import Tile2 from "./Tile2";
import "./Splash.css"

const Splash = props => {
    return (
        <div className="splash">
            <NavBar/>
            <Tile1/>
            <Tile2/>
        </div>
    )
}

export default Splash;
