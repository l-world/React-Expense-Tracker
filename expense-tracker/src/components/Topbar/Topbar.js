import React from 'react'
import './topbar.css'
import Avatar from '../../pages/Dashboard/Icon/avatar.svg'
import { useAuth } from '../../components/AuthContext'

export default function Topbar(props) {
    const { currentUser } = useAuth()
    return (
        <header className="dashboard__topbar">
            <h3 className="dashboard__topbar__title">{props.headTitle || 'Dashboard'}</h3>
            <div className="dashboard__topbar__users">
                <img src={currentUser.photoURL || Avatar} alt="user-avatar" className="dashboard__topbar__users_avatar" />
                <span className="dashboard__topbar__users_name">{currentUser.displayName || 'Anonymous'}</span>
                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" className="dashboard__topbar__users_arrow">
                    <path d="M9.69281 0.293945H5.27989H1.30612C0.626122 0.293945 0.286122 1.11561 0.767789 1.59729L4.43698 5.26645C5.02489 5.85437 5.98114 5.85437 6.56906 5.26645L7.96448 3.87104L10.2382 1.59729C10.7128 1.11561 10.3728 0.293945 9.69281 0.293945Z" fill="#1B212D" />
                </svg>
            </div>
        </header>
    )
}

