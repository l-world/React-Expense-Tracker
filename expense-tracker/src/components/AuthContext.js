import React from 'react'
import { auth, provider, db } from '../firebase-config'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    sendPasswordResetEmail
} from 'firebase/auth';
import { updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import {
    // collection,
    // getDocs,
    doc,
    // updateDoc,
    setDoc,
    // query,
    // onSnapshot
} from 'firebase/firestore'


const AuthContext = React.createContext()


export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthContextProvider({ children }) {


    const [currentUser, setCurrentUser] = React.useState({
        displayName:'',
        email:'',
        // photoURL:'',
        uid:'',

    });
    const [loading, setLoading] = React.useState(true);

    const navigate = useNavigate()
    function signup(email, password, displayNameP) {
        console.log("create account")
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: displayNameP
                })
            })
            .then(() => {
                console.log("did update displayName")
                navigate('/')
            })
            .catch((error) => console.log(error))
    }

    function login(email, password) {
        console.log("logining")
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("signed in")
            navigate('/')
        })
        .catch((error) => console.log(error))
    }

    function logout() {
        signOut(auth);
    }

    function loginGoogle() {
        signInWithPopup(auth, provider)
    }

    function forgetPassWord(email) {
        sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' })
        // .then(()=>{    
        //   console.log(email)
        //   alert("we successfully sent you an email with password reset link!")
        // })
        // .catch((err)=>console.log(err))
    }

    const [userData, setUserData] = React.useState({
        id: '',
        firstName: '',
        lastName: '',
        dateofBirth: '',
        mobilePhone: '',
        email: ''
    })


    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null){console.log(`auth change:${user.uid}   ${user.displayName}`)}
            else{console.log("auth change: null")}
            setCurrentUser(user);
            setLoading(false);
            if (user !== null) {
                setCurrentUser((prev)=>({
                    ...prev,
                    displayName: user.displayName,
                    email: user.email,
                    // photoURL: user.photoURL,
                    uid : user.uid
                }))
            }
        })
    }, []);

    function createData(userData) {
        const id = currentUser.uid;
        const newData = {
            uid: id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateofBirth: userData.dateofBirth,
            mobilePhone: userData.mobilePhone,
            email: userData.email
        }
        setDoc(doc(db, `${id}-data`, id), newData)
    }

    //get realtime user data after page refresh
    // const dataRef = collection(db, "userData");
    // const remoteData = query(dataRef);
    // React.useEffect(() => {
    //     onSnapshot(remoteData, async () => {
    //         const remoteDoc = await getDocs(remoteData);
    //         const remoteUserData = remoteDoc.docs.map((doc) => doc.data());
    //         setUserData(remoteUserData);
    //     });
    // }, []);

    function handleEditSubmit(userData) {
        console.log(userData)
        // updateDoc(userData)
    }


    // onAuthStateChanged(auth,(user)=>{
    //     if(user){
    //         getUserName = auth.currentUser.displayName;s

    return (
        <AuthContext.Provider value={{ currentUser, signup, login, logout, loginGoogle, forgetPassWord, userData, setUserData, handleEditSubmit, createData }}>
            {!loading && children}
        </AuthContext.Provider>
    );

}

