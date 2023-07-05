import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MainLogo from "../../MainLogo";
import './NavBar.css'

// if logged in, log in button should say "Open Discord"

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-holder">
                <MainLogo/>
                <div className="navbar-links">
                    <Link to={{pathname: "https://github.com/dtannyc1/Davescord"}}
                        target="_blank">
                            <i className="fa-brands fa-github fa-xl"></i>
                            <div>Github</div>
                    </Link>
                    <Link to={{pathname: "https://www.linkedin.com/in/dtannyc1/"}}
                        target="_blank">
                            <i className="fa-brands fa-linkedin fa-xl"></i>
                            <div>LinkedIn</div>
                    </Link>
                    <Link to={{pathname: "https://wellfound.com/u/david-tan-47"}}
                        target="_blank">
                            <i className="fa-brands fa-angellist fa-xl"></i>
                            <div>Wellfound</div>
                    </Link>
                </div>
                <Link to="/login" className="navbar-login">Login</Link>
            </div>
        </nav>
    )
}

export default NavBar;
