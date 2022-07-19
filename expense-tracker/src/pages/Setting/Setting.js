import React from 'react'
import './setting.css'
import Topbar from '../../components/Topbar/Topbar'
import { useAuth } from '../../components/AuthContext'

function Setting() {
  const { currentUser,userData,setUserData,handleEditSubmit,createData} = useAuth()
  const [editState, setEditState] = React.useState(false)

  function handleEdit() {
    setEditState(true)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditState(false)
    userData.id?
    handleEditSubmit(userData)  
    : createData(userData)
  }



  return (
    <main className='dashboard'>
      <Topbar   headTitle="Setting" username={currentUser.displayName}/>
      <section className="dashboard__main">
        <form className="setting__main__content">
          <div className='setting__main__content_1'>
            <h4 className='setting__main_title_text'>Account Information</h4>
            <span >Update your account information</span>

          </div>
          <div className='setting__main__content_2'>
            <h4 className='setting__main_title_text'>Personal Information</h4>
          </div>
          <div className='setting__main__content_3'>
            {!editState && <img src="./images/Edit.png" onClick={handleEdit} alt="edit" className="setting_edit_img" />}
          </div>
          <div className='setting__main__content_4'>
            <span> First Name</span>
            <input className='form-text' name="displayName-first" disabled={!editState} onChange={handleChange} placeholder={currentUser.displayName || 'Enter your full name'} />
            {/* onBlur={isValidName} */}
          </div>
          <div className='setting__main__content_4'>
            <span> Last Name</span>
            <input className='form-text' name="displayName-last" disabled={!editState} onChange={handleChange} placeholder='Enter your full name' />
            {/* onBlur={isValidName} */}
          </div>
          <div className='setting__main__content_4'>
            <span> Date of Birth</span>
            <input className='form-text' name="DateOfBirth" type="date" disabled={!editState} onChange={handleChange} />
          </div>
          <div className='setting__main__content_4'>
            <span> Mobile Number</span>
            <input className='form-text' name="Mobile" type="tel" disabled={!editState} onChange={handleChange} placeholder='Mobile number...' />
          </div>
          <div className='setting__main__content_5'>
            <span> Email</span>
            <input className='form-text' type="email" name="email" disabled={!editState} onChange={handleChange} placeholder={currentUser.email} />
            {/*onBlur={isValidEmail}  */}
          </div>
          <div className='setting__main__content_4'>
            <span>New Password</span>
            <input className='form-text' type="password" name="NewPW" disabled={!editState} onChange={handleChange} placeholder='Enter your password' />
            {/* onBlur={isValidPassword} */}
          </div>
          <div className='setting__main__content_4'>
            <span>Confirm Password</span>
            <input className='form-text' type="password" name="ConfirmPW" disabled={!editState} onChange={handleChange} placeholder='Enter your password' />
            {/*onBlur={isSamePassword} */}
          </div>
          <div className='setting__main__content_4'>
            {editState && <button className='setting__main__content_submit' onClick={handleSubmit}>Update</button>}
          </div>
        </form>
      </section>
    </main>
  )
}

export default Setting
