import React from 'react'
import './sign.css';
import { useAuth } from '../../components/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom';


function Signin() {
    const { currentUser, login } = useAuth()

    const [loginData, setLoginData] = React.useState({
        email: "",
        password: "",
    })
    function handleChange(e) {
        const { type, value } = e.target;
        setLoginData((prev) => ({ ...prev, [type]: value }))
    }

    const navigate = useNavigate()
    function handleSubmit(e) {
        e.preventDefault();
        login(loginData.email, loginData.password)
            .then((cred) => {
                console.log(cred.user)
                navigate("/")
            })
            .catch((err) => { console.log(err) })
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
                            <input className='form-text' type="email" onChange={handleChange} placeholder='Enter your email' />
                            <span>Password</span>
                            <input className='form-text' type="password" onChange={handleChange} placeholder='Enter your password' />
                            <div className='form-hint1'>
                                <div>
                                    <input className='checkbox' type="checkbox" id='remember' name="remember" />
                                    <label htmlFor="remember">Remember for 30 Days</label>
                                </div>
                                <span> Forget password</span>
                            </div>
                            <button onClick={handleSubmit} >Sign in</button>
                            <button id='signByGoogle'>
                                <img src='./images/Google.png' alt='btnImg' />
                                Sign up with google
                            </button>                </form>
                        <div className='form-hint2'>
                            Don't have an account?
                            <div className="sign-guide1" >
                                <Link className="sign-guide-link" to="/sign-up">Sign up for free</Link>
                                <img className="sign-guide-img1" alt='sign-guide' src='./images/VectorSignUp.png' />
                            </div>
                        </div>
                    </div>
                    <img className='sign-image' src='./images/sign.png' alt='sign' />
                </div>
            }
        </div>
    )
}

export default Signin
