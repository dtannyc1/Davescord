import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MainLogo from "../MainLogo";
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-holder">
                <MainLogo/>
                <div className="navbar-links">
                    <Link to={{pathname: "https://github.com/dtannyc1/Davescord"}}
                        target="_blank">Github</Link>
                    <Link to={{pathname: "https://www.linkedin.com/in/dtannyc1/"}}
                        target="_blank">LinkedIn</Link>
                </div>
                <Link to="/login" className="navbar-login">Log In</Link>
            </div>
        </nav>
    )
}

export default NavBar;
