import React from 'react'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Dashboard from './pages/Dashboard/Dashboard'
import Expense from './pages/Expenses/Expenses'

export default function App() {
  return (
    <BrowserRouter>
    <div className='app'>
        <Navbar />
        <Routes>
            <Route path="/" component={ <Dashboard /> } />
            <Route path="/expense" component={ <Expense /> }/>
        </Routes>
    </div>
    </BrowserRouter>
  )
}

