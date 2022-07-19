import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import './Navbar.css'
import dashboardIcon from './Icon/dashboard.svg'
import expenseIcon from './Icon/expense.svg'
import settingIcon from './Icon/setting.svg'
import footerIcon from './Icon/footer.svg'
import { useAuth } from '../../components/AuthContext'


export default function Navbar() {
    const { currentUser,logout } = useAuth()
    const navigate = useNavigate();
    const handleClick=async () =>{
		   await logout();
			navigate('/login');
    } 

    return (
        currentUser &&
        <div className='navbar'>
            <div className="navbar__logo">
                <div className="navbar__logo__icon"></div>
                <span className="navbar__logo__title">Maglo.</span>
            </div>
            <div className="navbar__main">
                <nav className="navbar__main__nav">
                    <NavLink to="/" className="navbar__main__nav__link">
                        <img src={dashboardIcon} alt="dashboard-icon" className='navbar__main__nav__link__icon' />
                        <span className="navbar__main__nav__text">Dashboard</span>
                    </NavLink>
                    <NavLink to="expense" className="navbar__main__nav__link">
                        <img src={expenseIcon} alt="expense-iocn" className='navbar__main__nav__link__icon' />
                        <span className="navbar__main__nav__text">Expenses</span>
                    </NavLink>
                    <NavLink to="setting" className="navbar__main__nav__link">
                        <img src={settingIcon} alt="settings-iocn" className='navbar__main__nav__link__icon' />
                        <span className="navbar__main__nav__text">Settings</span>
                    </NavLink>
                </nav>
            </div>
           
            <div className="navbar__logout" >
                <img src={footerIcon} alt="footer-iocn" className='navbar__logout__icon' />
                <span className="navbar__logout__text" onClick={handleClick} >Logout</span>
            </div>
        </div>
    
    )
}
