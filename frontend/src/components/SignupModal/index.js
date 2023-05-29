import { useState} from "react";
import {useDispatch} from "react-redux";
import { signupUser } from "../../store/session";
import { Link } from "react-router-dom";
import "./SignupModal.css"

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
        } catch (err) {
            console.log(err.errors)
            setErrors(err.errors)
        }
    }

    const createLabelEmail = () => {
        if (errors.length > 0) {
            return <label htmlFor="email-input" className='signup-error'>EMAIL<p className='signup-error'>&nbsp;&ndash; {errors[0]}</p></label>
        } else {
            return (
                <label htmlFor="email-input">EMAIL <p className='signup-error'>&nbsp;*</p></label>
            )
        }
    }

    const createLabelUsername = () => {
        if (errors.length > 0) {
            return <label htmlFor="username-input" className='signup-error'>USERNAME<p className='signup-error'>&nbsp;&ndash; {errors[0]}</p></label>
        } else {
            return (
                <label htmlFor="username-input">USERNAME <p className='signup-error'>&nbsp;*</p></label>
            )
        }
    }

    const createLabelPassword = () => {
        if (errors.length > 0) {
            return <label htmlFor="password-input" className='signup-error'>PASSWORD <p className='signup-error'>&nbsp;&ndash; {errors[0]}</p></label>
        } else {
            return <label htmlFor="password-input">PASSWORD <p className='signup-error'>&nbsp;*</p></label>
        }
    }

    return (
        <div className="signup-modal-holder">
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
                        <p><Link to="/login">Already have an account?</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpModal;
