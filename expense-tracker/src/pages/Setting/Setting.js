import React from 'react'
import '../Dashboard/dashboard.css'
import './setting.css'
import Avatar from '../Dashboard/Icon/avatar.svg'
function Setting() {

  const [editState,setEditState] = React.useState(false)

  function handleEdit(){
    setEditState(true)
  }
  function handleSubmit(e){
    e.preventDefault();
    setEditState(false)

  }

  return (
    <main className='dashboard'>
      <header className="dashboard__topbar">
        <h3 className="dashboard__topbar__title">Setting</h3>
        <div className="dashboard__topbar__users">
          <img src={Avatar} alt="user-avatar" className="dashboard__topbar__users_avatar" />
          <span className="dashboard__topbar__users_name">Mahfuzul Nabil</span>
          <svg width="11" height="6" viewBox="0 0 11 6" fill="none" className="dashboard__topbar__users_arrow">
            <path d="M9.69281 0.293945H5.27989H1.30612C0.626122 0.293945 0.286122 1.11561 0.767789 1.59729L4.43698 5.26645C5.02489 5.85437 5.98114 5.85437 6.56906 5.26645L7.96448 3.87104L10.2382 1.59729C10.7128 1.11561 10.3728 0.293945 9.69281 0.293945Z" fill="#1B212D" />
          </svg>
        </div>
      </header>
      <section className="dashboard__main">
        <form className="setting__main__content">
          <div className='setting__main__content_1'>
            <h4 className='setting__main_title_text'>Account Information</h4>
            <span>Update your account information</span>

          </div>
          <div className='setting__main__content_2'>
            <h4 className='setting__main_title_text'>Personal Information</h4>
          </div>
          <div className='setting__main__content_3'>
            {!editState&&<img src="./images/Edit.png" onClick={handleEdit} alt="edit" className="setting_edit_img" />}
          </div>
          <div className='setting__main__content_4'>
            <span> First Name</span>
            <input className='form-text' name="displayName-first" placeholder='Enter your full name' />
            {/* onChange={handleChange} onBlur={isValidName} */}
          </div>
          <div className='setting__main__content_4'>
            <span> Last Name</span>
            <input className='form-text' name="displayName-last" placeholder='Enter your full name' />
            {/* onChange={handleChange} onBlur={isValidName} */}
          </div>
          <div className='setting__main__content_4'>
            <span> Date of Birth</span>
            <input className='form-text' name="DateOfBirth" placeholder='Enter your full name' />
            {/* onChange={handleChange} onBlur={isValidName} */}
          </div>
          <div className='setting__main__content_4'>
            <span> Mobile Number</span>
            <input className='form-text' name="Mobile" placeholder='Enter your full name' />
            {/* onChange={handleChange} onBlur={isValidName} */}
          </div>
          <div className='setting__main__content_5'>
            <span> Email</span>
            <input className='form-text' type="email" name="email" placeholder='Enter your email' />
            {/* onChange={handleChange} onBlur={isValidEmail}  */}
          </div>
          <div className='setting__main__content_4'>
            <span>New Password</span>
            <input className='form-text' type="password" name="NewPW" placeholder='Enter your password' />
            {/* onChange={handleChange} onBlur={isValidPassword} */}
          </div>
          <div className='setting__main__content_4'>
            <span>Confirm Password</span>
            <input className='form-text' type="password" name="ConfirmPW" placeholder='Enter your password' />
            {/* onChange={handleChange} onBlur={isValidPassword} */}
          </div>
          <div className='setting__main__content_4'>
            {editState&&<button className='setting__main__content_submit'>Update</button>}
          </div>
        </form>
      </section>
    </main>
  )
}

export default Setting
