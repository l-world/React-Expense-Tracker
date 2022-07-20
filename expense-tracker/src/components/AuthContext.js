import React from 'react'
import { auth, provider} from '../firebase-config'
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


const AuthContext = React.createContext()


export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthContextProvider({ children }) {

    const [currentUser, setCurrentUser] = React.useState({
        displayName: '',
        email: '',
        photoURL:'',
        uid: '',

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
    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user !== null) { console.log(`auth change:${user.uid}   ${user.displayName}`) }
            else { console.log("auth change: null") }
            setCurrentUser(user);
            setLoading(false);
            // if (user !== null) {
            //     setCurrentUser((prev)=>({
            //         ...prev,
            //         displayName: user.displayName,
            //         email: user.email,
                    // photoURL: user.photoURL,
            //         uid : user.uid
            //     }))
            // }
        })
    }, []);



    return (
        <AuthContext.Provider value={{ currentUser, signup, login, logout, loginGoogle, forgetPassWord }}>
            {!loading && children}
        </AuthContext.Provider>
    );

}

