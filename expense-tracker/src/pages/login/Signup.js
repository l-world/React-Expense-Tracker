import { Link } from 'react-router-dom';
import { useAuth } from '../../components/AuthContext'
import React from 'react'

function Signup() {
  const { signup } = useAuth()

  const [loginData, setLoginData] = React.useState({
    email: "",
    password: "",
    displayName: "",
  })

  const [errData, setErrData] = React.useState({
    email: null,
    password: null,
    displayName: null,
  })

  function handleChange(e) {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    signup(loginData.email, loginData.password,loginData.displayName)
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
    if (loginData.password.length < 8) {
      setErrData((prev) => ({
        ...prev,
        password: "Password must be longer than 8 characters"
      }))}
    else {
      setErrData((prev) => ({
        ...prev,
        password: null
      }))}
  }
  function isValidName() {
    if (loginData.displayName==="") {
      setErrData((prev) => ({
        ...prev,
        displayName: "Please enter valid name"
      }))}
    else {
      setErrData((prev) => ({
        ...prev,
        displayName: null
      }))}  
  }

  return (
    <div className='sign'>
      <div className='sign-main'>
        <img className='sign-logo' src='./images/logo.png' alt='logo' />
        <h1>Create New Account</h1>
        <span className='sign-logo-slogan'>Welcome back! Please enter your details</span>
        <form className='sign-form'>
          <span> Full Name</span>
          <input className='form-text'  name="displayName"  onChange={handleChange} onBlur={isValidName} placeholder='Enter your full name' />
          {errData.displayName && <span className='err'>{errData.displayName}</span>}

          <span> Email</span>
          <input className='form-text' type="email" name="email" onChange={handleChange} onBlur={isValidEmail} placeholder='Enter your email' />
          {errData.email && <span className='err'>{errData.email}</span>}

          <span>Password</span>
          <input className='form-text' type="password" name="password" onChange={handleChange} onBlur={isValidPassword} placeholder='Enter your password' />
          {errData.password && <span className='err'>{errData.password}</span>}

          <button onClick={handleSubmit} disabled={errData.displayName||errData.email||errData.password}>Create Account</button>
          {/* <button id='signByGoogle'>
            <img src='./images/Google.png' alt='btnImg' />
            Sign up with google
          </button> */}
        </form>
        <div className='form-hint2'>
          Already have an account?
          <div className="sign-guide2" >
            <Link className="sign-guide-link" to="/login"> Sign in</Link>
            <img className="sign-guide-img2" alt='sign-guide' src='./images/VectorSignIn.png' />
          </div>
        </div>
      </div>
      <div className='sign-image' ></div>
    </div>

  )
}

export default Signup
