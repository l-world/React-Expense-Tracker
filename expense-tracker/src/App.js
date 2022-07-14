import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Expense from './pages/Expenses/Expenses'
import Signin from './pages/Login/Signin'
import Signup from './pages/Login/Signup'
import { AuthContextProvider } from './components/AuthContext'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (

    <div className='app'>
      <BrowserRouter>
      <AuthContextProvider>
          <Navbar />
          {/* for debug at current stage :  */}
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="expense" element={<PrivateRoute><Expense /></PrivateRoute>} />
            <Route path="login" element={<Signin />} />
            <Route path="sign-up" element={<Signup />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>

  )
}

