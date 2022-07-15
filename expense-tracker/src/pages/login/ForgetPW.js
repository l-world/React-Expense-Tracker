import React from 'react';
import { auth} from '../../firebase-config';
import { sendPasswordResetEmail } from 'firebase/auth';



function ForgetPW() {

  const [email, setData] = React.useState(null)

  const [errData, setErrData] = React.useState( null)

  function handleChange(e) {
    const value  = e.target.value
    setData(value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    isValidEmail();
    if (errData) return;
    sendPasswordResetEmail(auth,email)//???????????
    .then(()=>alert("we successfully sent you an email with password reset link!"))
    .catch((err)=>console.log(err))
  }
  //validator
  const emailValidator = /^\S+@\S+\.\S+$/;
  function isValidEmail() {
    if (emailValidator.test(email) === false) {
      setErrData("Please enter valid email")
    }
    else {
      setErrData(null)
    }
  }


  return (
    <div className='sign'>
      <div className='sign-main'>
        <img className='sign-logo' src='./images/logo.png' alt='logo' />
        <h1>Reset Password</h1>
        <span className='sign-logo-slogan'>Please enter your email</span>
        <form className='sign-form'>
          <span> Email</span>
          <input className='form-text'  onChange={handleChange} placeholder='Enter your email' />
          {errData && <span className='err'>{errData}</span>}

          <button onClick={handleSubmit} >Reset Password</button>

        </form>
      </div>
      <div className='sign-image' ></div>
    </div>

  )
}

export default ForgetPW
