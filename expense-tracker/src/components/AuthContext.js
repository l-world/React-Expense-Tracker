import React from 'react'
import { auth, provider } from '../firebase-config'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
  } from 'firebase/auth';

const AuthContext = React.createContext()


export function useAuth() {
    return React.useContext(AuthContext);
}

export function AuthContextProvider({ children }) {


    const [currentUser, setCurrentUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        signOut(auth);
    }


    function loginGoogle() {
        signInWithPopup(auth, provider)
    }

    React.useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);
    // onAuthStateChanged(auth,(user)=>{
    //     if(user){
    //         getUserName = auth.currentUser.displayName;

    return (
        <AuthContext.Provider value={{ currentUser, signup, login, logout ,loginGoogle}}>
            {!loading && children}
        </AuthContext.Provider>
    );

}

