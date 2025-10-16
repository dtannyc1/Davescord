import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import logo from '../../assets/Davescord-logo.svg';
import './MainLogo.css'

const MainLogo = props => {
    return (
        <Link to="/" className="main-logo-link">
            <img className="main-logo" src={logo} alt="Davescord Logo"/>
        </Link>
    )
}

export default MainLogo;
