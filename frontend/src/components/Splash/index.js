import NavBar from "./NavBar";
import Tile1 from "./Tile1";
import Tile2 from "./Tile2";
import "./Splash.css"
import Tile3 from "./Tile3";

const Splash = props => {
    return (
        <div className="splash">
            <NavBar/>
            <Tile1/>
            <Tile2/>
            <Tile3/>
        </div>
    )
}

export default Splash;
