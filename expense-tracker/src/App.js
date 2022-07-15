import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Setting from './pages/Setting/Setting'
import Expense from './pages/Expenses/Expenses'
import Signin from './pages/login/Signin'
import Signup from './pages/login/Signup'
import {AuthContextProvider} from "./components/AuthContext"
import PrivateRoute from "./components/PrivateRoute"
import ForgetPW from './pages/login/ForgetPW'

export default function App() {
    return (
        <BrowserRouter>
        <AuthContextProvider>
            <div className='app'>
                <div className="app__body">
                    <Navbar />
                    {/* for debug at current stage :  */}
                    <div className='app__body__routes'>
                        <Routes >
                            <Route path="/" element={<Dashboard />} />
                            <Route path="expense" element={<Expense />} />
                            <Route path="setting" element={<PrivateRoute><Setting /></PrivateRoute>} />
                            <Route path="login" element={<Signin />} />
                            <Route path="sign-up" element={<Signup />} />
                            <Route path="forgetPassWord" element={<ForgetPW />} />
                        </Routes>
                    </div >

                </div>

            </div>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

