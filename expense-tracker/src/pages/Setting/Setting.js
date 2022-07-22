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
  const { currentUser, setCurrentUser, updateDisplayName, updatePW ,signErr} = useAuth()
  const [editState, setEditState] = React.useState(false)
  const displayName_firstName = currentUser.displayName.indexOf(" ") !== -1 ? currentUser.displayName.split(' ')[0] : currentUser.displayName
  const displayName_lastName = currentUser.displayName.indexOf(" ") !== -1 ? currentUser.displayName.split(' ')[1]
    : "";

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
      .then(() => {
        updateDisplayName(userData.firstName, userData.lastName)
        if(PW.confPW===PW.newPW&&PWErr.confPWErr==null){ updatePW(PW.confPW)}
      })
      .catch((error) => console.log(error))
  }


  React.useEffect(() => {
    getDoc(docRef)
      .then((remoteDoc) => {
        if (remoteDoc) {
          const remoteUserData = remoteDoc.data()
          if (!editState) {
            setUserData((prev) => ({
              ...prev,
              firstName: remoteUserData.firstName,
              lastName: remoteUserData.lastName,
              dateOfBirth: remoteUserData.dateOfBirth,
              mobilePhone: remoteUserData.mobilePhone,
              email: remoteUserData.email
            }
            ))
            setCurrentUser((prev) => ({
              ...prev,
              displayName: `${userData.firstName} ${userData.lastName}`

            }))
          }
        }
      })
      .catch((err) => console.log(err))
  })

  function handleEdit() {
    setEditState(true)
  }

  const [PW, setPW] = React.useState({
    newPW: "",
    confPW: ""
  })
  const [PWErr, setPWErr] = React.useState({
    emailErr:"",
    newPWErr: "",
    confPWErr: ""
  })
  function handlePWChange(e) {
    const { name, value } = e.target
    setPW((prev) => ({
      ...prev,
      [name]: value
    }))}

  const emailValidator = /^\S+@\S+\.\S+$/;
  function isValidEmail() {
    if (emailValidator.test(userData.email) === false) {
      setPWErr((prev) => ({
        ...prev,
        emailPWErr: "Please enter valid email"
      }))
    }
    else {
      setPWErr((prev) => ({
        ...prev,
        emailPWErr: null
      }))
    }
  }
  function isValidPW() {
    if (PW.newPW.length<8) {
      setPWErr((prev) => ({
        ...prev,
        newPWErr: "Please enter valid email"
      }))
    }
    else {
      setPWErr((prev) => ({
        ...prev,
        newPWErr: null
      }))
    }
  }
  function isValidConfPW() {
    if (PW.newPW !== PW.confPW) {
      setPWErr((prev) => ({
        ...prev,
        confPWErr: "not same"
      }))
    }
    else {
      setPWErr((prev) => ({
        ...prev,
        confPWErr: null
      }))
    }
  }

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
            <input className='form-text' type="email" name="email" disabled={!editState} onChange={handleChange} value={userData.email} onBlur={isValidEmail} />
            {PWErr.email && <span className='err'>{PWErr.emailErr}</span>}
          </div>
          <div className='setting__main__content_4'>
            <span>New Password</span>
            <input className='form-text' type="password" name="newPW" disabled={!editState} onChange={handlePWChange} onBlur={isValidPW} placeholder='Enter your password' />
            {PWErr.newPWErr && <span className='err'>{PWErr.newPWErr}</span>}
          </div>
          <div className='setting__main__content_4'>
            <span>Confirm Password</span>
            <input className='form-text' type="password" name="confPW" disabled={!editState} onChange={handlePWChange} onBlur={isValidConfPW} placeholder='Enter your password' />
            {PWErr.confPWErr && <span className='err'>{PWErr.confPWErr}</span>}
          </div>
          <div className='setting__main__content_4'>
            {editState && <button className='setting__main__content_submit' onClick={handleSubmit}>Update</button>}
            {signErr && <span className='err'>{signErr}</span>}

          </div>
        </form>
      </section>
    </main>
  )
}

export default Setting
