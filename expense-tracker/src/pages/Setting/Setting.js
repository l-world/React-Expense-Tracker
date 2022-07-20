import React from 'react'
import './setting.css'
import Topbar from '../../components/Topbar/Topbar'
import { useAuth } from '../../components/AuthContext'
import { db } from '../../firebase-config'

import {
  getDoc,
  doc,
  setDoc,
  // onSnapshot
} from 'firebase/firestore'

function Setting() {
  const { currentUser } = useAuth()
  const [editState, setEditState] = React.useState(false)

  const displayName_firstName = currentUser.displayName.split(' ')[0]
  const displayName_lastName = currentUser.displayName.split(' ')[1]
  const id = currentUser.uid;
  const docRef = doc(db, "userProfile", id)

  const [userData, setUserData] = React.useState({
    id: currentUser.uid,
    firstName: displayName_firstName,
    lastName: displayName_lastName,
    dateOfBirth: '',
    mobilePhone: '',
    email: currentUser.email
  })


  function handleChange(e) {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEditState(false)
    updateData(userData)
  }

  function updateData(userData) {
    setDoc(docRef, userData)
  }

  React.useEffect(() => {
    getDoc(docRef)
      .then((remoteDoc) => {if(remoteDoc){
        const remoteUserData = remoteDoc.data()
        if(!editState){
        setUserData((prev) => ({
              ...prev,
              firstName: remoteUserData.firstName,
              lastName: remoteUserData.lastName,
              dateOfBirth: remoteUserData.dateOfBirth,
              mobilePhone: remoteUserData.mobilePhone,
              email: remoteUserData.email
            }))}}
          })
      .catch((err) => console.log(err))
  })

  function handleEdit() {
    setEditState(true)
  }

  function handlePWChange() { }

  function confirmPWChange() { }

  return (
    <main className='dashboard'>
      <Topbar headTitle="Setting" avatar={currentUser.photoURL} username={currentUser.displayName} />
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
            <input className='form-text' name="firstName" disabled={!editState} onChange={handleChange}
              value={userData.firstName} placeholder={'Enter your last name'}
            />
          </div>
          <div className='setting__main__content_4'>
            <span> Last Name</span>
            <input className='form-text' name="lastName" disabled={!editState} onChange={handleChange}
              value={userData.lastName} placeholder={'Enter your last name'}
            />
          </div>
          <div className='setting__main__content_4'>
            <span> Date of Birth</span>
            <input className='form-text' name="dateOfBirth" type="date" disabled={!editState} onChange={handleChange} value={userData.dateOfBirth} />
          </div>
          <div className='setting__main__content_4'>
            <span> Mobile Number</span>
            <input className='form-text' name="mobilePhone" type="tel" disabled={!editState} onChange={handleChange} value={userData.mobilePhone} />
          </div>
          <div className='setting__main__content_5'>
            <span> Email</span>
            <input className='form-text' type="email" name="email" disabled={!editState} onChange={handleChange} value={userData.email} />
            {/*onBlur={isValidEmail}  */}
          </div>
          <div className='setting__main__content_4'>
            <span>New Password</span>
            <input className='form-text' type="password" name="NewPW" disabled={!editState} onChange={handlePWChange} placeholder='Enter your password' />
            {/* onBlur={isValidPassword} */}
          </div>
          <div className='setting__main__content_4'>
            <span>Confirm Password</span>
            <input className='form-text' type="password" name="ConfirmPW" disabled={!editState} onChange={confirmPWChange} placeholder='Enter your password' />
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
