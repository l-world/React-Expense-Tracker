import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Setting from './pages/Setting/Setting'
import Expense from './pages/Expenses/Expenses'
<<<<<<< HEAD
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
=======
import Signin from './pages/login/Signin'
import Signup from './pages/login/Signup'

export default function App() {
    return (
        <BrowserRouter>
            <div className='app'>
                <div className="app__body">
                    <Navbar />
                    {/* for debug at current stage :  */}
                    <div className='app__body__routes'>
                        <Routes >
                            <Route path="/" element={<Dashboard />} />
                            <Route path="expense" element={<Expense />} />
                            <Route path="setting" element={<Setting />} />
                            <Route path="login" element={<Signin />} />
                            <Route path="sign-up" element={<Signup />} />
                        </Routes>
                    </div >

                </div>

            </div>
        </BrowserRouter>
    )
>>>>>>> bdfa79b1abe9e9e59affcefa564c255f99134906
}

