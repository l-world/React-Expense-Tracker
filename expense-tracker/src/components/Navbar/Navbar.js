import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
import logoIcon from './Icon/logo.svg'
import dashboardIcon from './Icon/dashboard.svg'
import expenseIcon from './Icon/expense.svg'
import settingIcon from './Icon/setting.svg'
import footerIcon from './Icon/footer.svg'
import { useAuth } from '../../components/AuthContext'


export default function Navbar() {
    const { currentUser, logout } = useAuth()
    function handleClick(){
        logout()
        .then((cred)=>{console.log("log out :"+cred.user)})
        .catch((error)=>{console.log(error)})
    }

    return (
        <div className='navbar'>
            <div className="navbar__logo">
                <img src={logoIcon} alt="logo" />
                <span className="navbar__logo__title">Maglo.</span>
            </div>
            <div className="navbar__link">
                <nav>
                    <NavLink to="/">
                        <img src={dashboardIcon} alt="dashboard-icon" />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/expense">
                        <img src={expenseIcon} alt="expense-iocn" />
                        <span>Expenses</span>
                    </NavLink>
                    <NavLink to="/setting">
                        <img src={settingIcon} alt="settings-iocn" />
                        <span>Settings</span>
                    </NavLink>
                </nav>
            </div>
            {currentUser &&
            <footer className="navbar__footer">
                <img src={footerIcon} alt="footer-iocn" />
                <button onClick={handleClick}>Logout</button>
            </footer>}
        </div>
    )
}
