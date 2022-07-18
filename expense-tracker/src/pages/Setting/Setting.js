import React from 'react'
import './setting.css'
import Topbar from '../../components/Topbar/Topbar'

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
      <Topbar />
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
            {editState&&<button className='setting__main__content_submit' onClick={handleSubmit}>Update</button>}
          </div>
        </form>
      </section>
    </main>
  )
}

export default Setting
