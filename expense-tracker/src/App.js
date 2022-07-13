import React from 'react'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Expense from './pages/Expenses/Expenses'
import Signin from './pages/login/Signin'
import Signup from './pages/login/Signup'

export default function App() {
  return (
    <BrowserRouter>
    <div className='app'>
        <Navbar />
        {/* for debug at current stage :  */}
        <Routes>
            <Route path="/" component={ <Dashboard /> } />
            <Route path="/expense" component={ <Expense /> }/>
            <Route path="login" element={<Signin />} />
            <Route path="sign-up" element={<Signup />} />
        </Routes>
    </div>
    </BrowserRouter>
  )
}

