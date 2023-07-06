import "./Footer.css";
import MainLogo from "../../MainLogo";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const SplashFooter = () => {
    return (
        <div className="splashfooter-holder">
            <div className="splashfooter-text">
                <div className="splashfooter-linkholder">
                    <h3>Developer Links</h3>
                    <ul>
                        <li>
                            <Link to={{pathname: "https://github.com/dtannyc1/Davescord"}}
                                target="_blank">
                                    <i className="fa-brands fa-github fa-xl"></i>
                                    <div>Github</div>
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname: "https://www.linkedin.com/in/dtannyc1/"}}
                                target="_blank">
                                    <i className="fa-brands fa-linkedin fa-xl"></i>
                                    <div>LinkedIn</div>
                            </Link>
                        </li>
                        <li>
                            <Link to={{pathname: "https://wellfound.com/u/david-tan-47"}}
                                target="_blank">
                                    <i className="fa-brands fa-angellist fa-xl"></i>
                                    <div>Wellfound</div>
                            </Link>
                        </li>
                    </ul>
                </div>

                <hr className="footer-hr"/>
                <div className="footer-bottom">
                    <MainLogo/>
                    <Link to="/register" className="footer-signup">Sign up</Link>
                </div>
            </div>
        </div>
    )
}

export default SplashFooter;
