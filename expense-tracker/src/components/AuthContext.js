import React from 'react'
import { auth, provider } from '../firebase-config'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    sendPasswordResetEmail,
    updatePassword
} from 'firebase/auth';
import { updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


const AuthContext = React.createContext()


export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthContextProvider({ children }) {

    const [currentUser, setCurrentUser] = React.useState({
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',

    });
    const [loading, setLoading] = React.useState(true);
    const [signErr, setSignErr]=React.useState();

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
            .catch((error) => {
                setSignErr(error.message);
                console.log(error.message)})
    }
    function updateDisplayName(firstName, lastName) {
        updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`
        })
    }
    function login(email, password) {
        console.log("logining")
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("signed in")
                navigate('/')
            })
            .catch((error) => {
                setSignErr(error.message);
                console.log(error.message)})
    }

    function logout() {
        signOut(auth);
    }

    function loginGoogle() {
        signInWithPopup(auth, provider)
    }

    function forgetPassWord(email) {
        sendPasswordResetEmail(auth, email, { url: 'http://localhost:3000/login' })
            .then(() => {
                console.log(email)
                alert("we successfully sent you an email with password reset link!")
            })
            .catch((error) =>  {
                setSignErr(error.message);
                console.log(error.message)}
            )
    }

    function updatePW(newPW){
        updatePassword(auth.currentUser,newPW)
        .then(()=>alert("set new password successfully"))
        .catch((error)=>{
            setSignErr(error.message);
            console.log(error.message)})
    }
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) { console.log(`auth change:${user.uid}   ${user.displayName}`) }
            else { console.log("auth change: null") }
            setCurrentUser(user);
            setLoading(false);
            setSignErr(null);
        })
    }, []);


    return (
        <AuthContext.Provider value={{ currentUser, signup, login, logout, loginGoogle, signErr,forgetPassWord, setCurrentUser, updateDisplayName,updatePW }}>
            {!loading && children}
        </AuthContext.Provider>
    );

}

