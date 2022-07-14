import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext'
import { updateProfile } from "firebase/auth";


function Signup() {
  const { currentUser, signup } = useAuth()

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
    displayName: ""
  })
  function handleChange(e) {
    const { type, value } = e.target
    setLoginData((prev) => ({ ...prev, [type]: value }))
  }

  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    signup(loginData.email, loginData.password)
      .then(
        () => {
          if (currentUser) {
            updateProfile({
              displayName: loginData.displayName
            }).then(() => {
              navigate('/');
            })
          }
        })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className='sign'>
      <div className='sign-main'>
        <img className='sign-logo' src='./images/logo.png' alt='logo' />
        <h1>Create New Account</h1>
        <span className='sign-logo-slogan'>Welcome back! Please enter your details</span>
        <form className='sign-form'>
          <span> Full Name</span>
          <input className='form-text' type="fullName" onChange={handleChange} placeholder='Enter your full name' />
          <span> Email</span>
          <input className='form-text' type="email" onChange={handleChange} placeholder='Enter your email' />
          <span>Password</span>
          <input className='form-text' type="password" onChange={handleChange} placeholder='Enter your password' />
          <button onClick={handleSubmit} >Create Account</button>
          <button id='signByGoogle'>
            <img src='./images/Google.png' alt='btnImg' />
            Sign up with google
          </button>
        </form>
        <div className='form-hint2'>
          Already have an account?
          <div className="sign-guide2" >
            <Link className="sign-guide-link" to="/login"> Sign in</Link>
            <img className="sign-guide-img2" alt='sign-guide' src='./images/VectorSignIn.png' />
          </div>
        </div>
      </div>
      <img className='sign-image' src='./images/sign.png' alt='sign' />
    </div>

  )
}

export default Signup
