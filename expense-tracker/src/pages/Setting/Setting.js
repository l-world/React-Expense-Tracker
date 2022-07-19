import React from 'react'
import './setting.css'
import Topbar from '../../components/Topbar/Topbar'
import { useAuth } from '../../components/AuthContext'
import { db } from '../../firebase-config'

import {
  // collection,
  // getDocs,
  doc,
  // updateDoc,
  setDoc,
  // query,
  // where,
  // onSnapshot
} from 'firebase/firestore'

function Setting() {
  const { currentUser} = useAuth()
  const [editState, setEditState] = React.useState(false)

      //user profile setting (not login things)
      const [userData, setUserData] = React.useState({
        id: currentUser.uid,
        firstName: currentUser.displayName,//如果cloud已经有了firsrname的值，优先展示，怎么从firebase取到这个值？
        lastName: '',
        dateOfBirth: '',
        mobilePhone: '',
        email: currentUser.email////如果cloud已经有了email的值，优先展示，怎么从firebase取到这个值？
    })
    const id = currentUser.uid;
    // const userProfileRef = collection(db, "userProfile");
    const docRef=doc(db, "userProfile", id)
    // const userCloudData = getDocs(docRef);

  function handleSubmit(e) {
    e.preventDefault();
    setEditState(false)
    updateData(userData)
  }

    function updateData(userData) {
        setDoc(docRef, userData)
    }

    //get realtime user data after page refresh
    // React.useEffect(() => {
    //         const remoteDoc =  getDocs(userCloudData);
    //         const remoteUserData = remoteDoc.data()
    //         setUserData(remoteUserData);
    // }, [userCloudData]);

    // function handleEditSubmit(userData) {
    //     console.log(userData)
    //     // updateDoc(userData)
    // }

  function handleEdit() {
    setEditState(true)
  }

  function handleChange(e) {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  function handlePWChange(){}

  function confirmPWChange(){}

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
            <input className='form-text' name="firstName" disabled={!editState} onChange={handleChange} value={userData.firstName || 'Enter your full name'} />
          </div>
          <div className='setting__main__content_4'>
            <span> Last Name</span>
            <input className='form-text' name="lastName" disabled={!editState} onChange={handleChange} placeholder='Enter your full name' />
          </div>
          <div className='setting__main__content_4'>
            <span> Date of Birth</span>
            <input className='form-text' name="dateOfBirth" type="date" disabled={!editState} onChange={handleChange} />
          </div>
          <div className='setting__main__content_4'>
            <span> Mobile Number</span>
            <input className='form-text' name="mobilePhone" type="tel" disabled={!editState} onChange={handleChange} placeholder='Mobile number...' />
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
