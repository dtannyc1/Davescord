import { useState} from "react";
import {useDispatch} from "react-redux";
import { signupUser, loginUser } from "../../store/session";
import { Link } from "react-router-dom";
import "./SignupModal.css"
import ModalBackground from "../ModalBackground";

const SignUpModal = props => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSignup = async e => {
        e.preventDefault();

        setErrors([]);
        try{
            await dispatch(signupUser({email, username, password}))
            setPassword('')
            setUsername('')
            setEmail('')
        } catch (err) {
            let tmpArr = Array(3).fill('');
            err.errors.forEach(error => {
                if (error.includes('Email') && tmpArr[0] === '') {
                    tmpArr[0] = error;
                } else if (error.includes('Username') && tmpArr[1] === '') {
                    tmpArr[1] = error;
                } else if (error.includes('Password') && tmpArr[2] === '') {
                    tmpArr[2] = error;
                }
            });
            setErrors(tmpArr)
        }
    }

    const createLabelEmail = () => {
        if (errors.length > 0 && errors[0] !== '') {
            return <label htmlFor="email-input" className='signup-error'>EMAIL<p className='signup-error'>&nbsp;&ndash; {errors[0]}</p></label>
        } else {
            return (
                <label htmlFor="email-input">EMAIL <p className='signup-error'>&nbsp;*</p></label>
            )
        }
    }

    const createLabelUsername = () => {
        if (errors.length > 0 && errors[1] !== '') {
            return <label htmlFor="username-input" className='signup-error'>USERNAME<p className='signup-error'>&nbsp;&ndash; {errors[1]}</p></label>
        } else {
            return (
                <label htmlFor="username-input">USERNAME <p className='signup-error'>&nbsp;*</p></label>
            )
        }
    }

    const createLabelPassword = () => {
        if (errors.length > 0 && errors[2] !== '') {
            return <label htmlFor="password-input" className='signup-error'>PASSWORD <p className='signup-error'>&nbsp;&ndash; {errors[2]}</p></label>
        } else {
            return <label htmlFor="password-input">PASSWORD <p className='signup-error'>&nbsp;*</p></label>
        }
    }

    const demoLogin = async e => {
        e.preventDefault();

        setErrors([]);
        try{
            await dispatch(loginUser({credential: "demo-login", password: "password"}))
            // clear input fields
            setEmail('')
            setUsername('')
            setPassword('')
        } catch (err) {
            // console.log("demo-login error")
            // console.log(err.errors)
            setErrors(err.errors)
        }
    }

    return (
        <div className="signup-modal-holder">
            <ModalBackground/>
            <div className="signup-modal">
                <h3>Create an account</h3>
                <form className="signup-form" onSubmit={handleSignup}>
                    {createLabelEmail()}
                    <input id="email-input" type="text" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}/>

                    {createLabelUsername()}
                    <input id="username-input" type="text" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}/>

                    {createLabelPassword()}
                    <input id="password-input"type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button>Continue</button>
                    <div className="signup-bottom">
                        <div className="signup-options-buttons">
                            <p><Link to="/login">Already have an account?</Link></p>
                            <p>Login as the <span onClick={demoLogin}>Demo User</span></p>
                        </div>
                        <br/>
                        <br/>
                        <p>By registering, you agree to consider hiring me:&nbsp;
                            <Link to={{pathname: "http://www.linkedin.com/in/dtannyc1/"}}
                                target="_blank">LinkedIn</Link> &&nbsp;
                            <Link to={{pathname: "https://github.com/dtannyc1/Davescord"}}
                                target="_blank">Github</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpModal;
