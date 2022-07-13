import React from 'react'
import Signin from './pages/Login/Signin'
import Signup from './pages/Login/Signup'
import {BrowserRouter,Routes,Route} from "react-router-dom"

export default function App() {
  return (
    <div className='app'>

      {/* for debug at current stage :  */}

      <BrowserRouter >
        <Routes>
          <Route path="login" element={<Signin />} />
          <Route path="sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter >

    </div>
  )
}

