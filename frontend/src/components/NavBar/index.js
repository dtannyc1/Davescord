import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MainLogo from "../MainLogo";
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className="navbar">
            <MainLogo/>
            <div className="navbar-links">
                <Link to="#">Download</Link>
                <Link to="#">Nitro</Link>
                <Link to="#">Discover</Link>
                <Link to="#">Safety</Link>
                <Link to="#">Support</Link>
                <Link to="#">Blog</Link>
                <Link to="#">Careers</Link>
            </div>
            <Link to="/login" className="navbar-login">Open Discord</Link>
        </nav>
    )
}

export default NavBar;
