import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Setting from './pages/Setting/Setting'
import Expense from './pages/Expenses/Expenses'
import Signin from './pages/login/Signin'
import Signup from './pages/login/Signup'
import { AuthContextProvider } from "./components/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import ForgetPW from './pages/login/ForgetPW'

export default function App() {

    return (
        <div className='app'>
            <div className="app__body">
                <BrowserRouter>
                    <AuthContextProvider >
                        <Navbar />
                        <div className='app__body__routes'>
                            <Routes >
                                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                                <Route path="expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
                                <Route path="setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
                                <Route path="login" element={<Signin />} />
                                <Route path="sign-up" element={<Signup />} />
                                <Route path="forgetPassWord" element={<ForgetPW />} />
                            </Routes>
                        </div >
                    </AuthContextProvider>
                </BrowserRouter>
            </div>

        </div>

    )
}

