import React from 'react'
import './sign.css';


function Signin() {
    return (
        <div className='sign'>
            <div className='sign-main'>
                <img className='sign-logo' src='./images/logo.png' alt='logo'/>
                <h1>Welcome back</h1>
                <span className='sign-logo-slogan'>Welcome back! Please enter your details</span>
                <form className='sign-form'>
                    <span> Email</span>
                    <input className='form-text' placeholder='Enter your email' />
                    <span>Password</span>
                    <input className='form-text' type="password"/>      
                    <div className='form-hint1'>
                        <div>
                        <input className='checkbox' type="checkbox"  id='remember'name="remember"  />
                        <label htmlFor="remember">Remember for 30 Days</label>
                    </div>
                    <span> Forget password</span>
                        </div>       
                        <button>Sign in</button>   
                        <button id='signByGoogle'></button>                           
                </form>
                <div className='form-hint2'>
                    <span>Don't have an account?</span>
                    <span> Sign up for free</span>
                </div>
            </div>
            <img className='sign-image' src='./images/sign.png' alt='sign'/>
        </div>
    )
}

export default Signin
