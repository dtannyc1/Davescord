import { useState } from "react";
import { Link } from "react-router-dom";
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
                    <label for="credential-input">USERNAME OR EMAIL</label>
                    <input id="credential-input" type="text" value={credential} onChange={e => setCredential(e.target.value)}/>

                    <label for="password-input">PASSWORD </label>
                    <input id="password-input"type="password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <Link to="#">Forgot your password?</Link>
                    <br/>
                    <button>Log In</button>
                    <div className="login-bottom">
                        <p>Need an account? <Link to="/signup">Register</Link></p>
                        <p>Login as the <button>Demo User</button></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;
