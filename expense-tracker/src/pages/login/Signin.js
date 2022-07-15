import React from 'react'
import './sign.css';
import { useAuth } from '../../components/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';


function Signin() {
    const { currentUser, login,loginGoogle } = useAuth()

    const [loginData, setLoginData] = React.useState({
        email: null,
        password: null,
    })
    const [errData, setErrData] = React.useState({
        email: null,
        password: null
    })

    function handleChange(e) {
        const { type, value } = e.target;
        setLoginData((prev) => ({ ...prev, [type]: value }))
    }

    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
        isValidEmail();
        isValidPassword();
        if (errData) return;

        //login firebase
        login(loginData.email, loginData.password)
            .then((cred) => {
                console.log(cred.user)
                navigate("/")
            })
            .catch((err) => { console.log(err) })
    }

    //validator
    const emailValidator = /^\S+@\S+\.\S+$/;
    function isValidEmail() {
        if (emailValidator.test(loginData.email) === false) {
            setErrData((prev) => ({
                ...prev,
                email: "Please enter valid email"
            }))
        }
        else {
            setErrData((prev) => ({
                ...prev,
                email: null
            }))
        }
    }
    function isValidPassword() {
        if (loginData.password.length < 1) {
            setErrData((prev) => ({
                ...prev,
                password: "Please enter password"
            }))
        }
        else {
            setErrData((prev) => ({
                ...prev,
                password: null
            }))
        }
    }
    function handleGoogle(e){
            e.preventDefault();
            loginGoogle()
    }

    return (
        <div>
            {currentUser ?
                <Navigate to="/" /> :

                <div className='sign'>
                    <div className='sign-main'>
                        <img className='sign-logo' src='./images/logo.png' alt='logo' />
                        <h1>Welcome back</h1>
                        <span className='sign-logo-slogan'>Welcome back! Please enter your details</span>
                        <form className='sign-form'>
                            <span> Email</span>
                            <input className='form-text' type="email" onChange={handleChange} onBlur={isValidEmail} placeholder='Enter your email' />
                            {errData.email && <span className='err'>{errData.email}</span>}
                            <span>Password</span>
                            <input className='form-text' type="password" onChange={handleChange} onBlur={isValidPassword} placeholder='Enter your password' />
                            {errData.password && <span className='err'>{errData.password}</span>}
                            <div className='form-hint1'>
                                <div>
                                    <input className='checkbox' type="checkbox" id='remember' name="remember" />
                                    <label htmlFor="remember">Remember for 30 Days</label>
                                </div>
                                <Link className="sign-guide-forgetPW" to="/forgetPassWord"> Forget password</Link>
                            </div>
                            <button onClick={handleSubmit} >Sign in</button>
                            <button id='signByGoogle' onClick={handleGoogle}>
                                <img src='./images/Google.png' alt='btnImg' />
                                Sign in with google
                            </button>                </form>
                        <div className='form-hint2'>
                            Don't have an account?
                            <div className="sign-guide1" >
                                <Link className="sign-guide-link" to="/sign-up">Sign up for free</Link>
                                <img className="sign-guide-img1" alt='sign-guide' src='./images/VectorSignUp.png' />
                            </div>
                        </div>
                    </div>
                    <div className='sign-image' ></div>
                </div>
            }
        </div>
    )
}

export default Signin
