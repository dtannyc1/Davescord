import { useState} from "react";
import {useDispatch} from "react-redux";
import { loginUser } from "../../store/session";
import { Link } from "react-router-dom";
import "./LoginModal.css"
import ModalBackground from "../ModalBackground";

const LoginModal = props => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleLogin = async e => {
        e.preventDefault();

        setErrors([]);
        try{
            await dispatch(loginUser({credential, password}))
            setPassword('')
            setCredential('')
        } catch (err) {
            setErrors(err.errors)
        }
    }

    const createLabelUsername = () => {
        if (errors.length > 0) {
            return <label htmlFor="credential-input" className='login-error'>USERNAME OR EMAIL <p className='login-error'>&nbsp;&ndash; {errors[0]}</p></label>
        } else {
            return (
                <label htmlFor="credential-input">USERNAME OR EMAIL <p className='login-error'>&nbsp;*</p></label>
            )
        }
    }

    const createLabelPassword = () => {
        if (errors.length > 0) {
            return <label htmlFor="password-input" className='login-error'>PASSWORD <p className='login-error'>&nbsp;&ndash; {errors[0]}</p></label>
        } else {
            return <label htmlFor="password-input">PASSWORD <p className='login-error'>&nbsp;*</p></label>
        }
    }

    const demoLogin = async e => {
        e.preventDefault();

        setErrors([]);
        try{
            await dispatch(loginUser({credential: "demo-login", password: "password"}))
            setPassword('')
            setCredential('')
        } catch (err) {
            // console.log("demo-login error")
            console.log(err.errors)
            setErrors(err.errors)
        }
    }

    return (
        <div className="login-modal-holder">
            <ModalBackground/>
            <div className="login-modal">
                <h3>Welcome back!</h3>
                <p>We're so excited to see you again!</p>
                <form className="login-form" onSubmit={handleLogin}>
                    {createLabelUsername()}
                    <input id="credential-input" type="text" autoComplete="username" value={credential} onChange={e => setCredential(e.target.value)}/>

                    {createLabelPassword()}
                    <input id="password-input"type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <Link to="#"> </Link>
                    <br/>
                    <button>Log In</button>
                    <div className="login-bottom">
                        <p>Need an account? <Link to="/register">Register</Link></p>
                        <p>Login as the <span onClick={demoLogin}>Demo User</span></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginModal;
