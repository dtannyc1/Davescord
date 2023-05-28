import { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./LoginModal.css"

const LoginModal = props => {
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();
    }

    return (
        <div className="login-modal-holder">
            <div className="login-modal">
                <h3>Welcome back!</h3>
                <p>We're so excited to see you again!</p>
                <form className="login-form" onSubmit={handleLogin}>
                    <label>USERNAME OR EMAIL <br/>
                        <input type="text" value={credential} onChange={e => setCredential(e.target.value)}/>
                    </label>
                    <br/>
                    <label>PASSWORD <br/>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <br/>
                    <Link to="#">Forgot your password?</Link>
                    <br/>
                    <button>Log In</button>
                    <p>Need an account? <Link to="#">Register</Link></p>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;
