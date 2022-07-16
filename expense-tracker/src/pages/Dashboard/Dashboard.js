import React from 'react'
import './dashboard.css'

import Avatar from './Icon/avatar.svg'
import Balance from './Icon/Balance'
import NetflixIcon from './Icon/nf.svg'

import { LineChart } from '../../components/Chart/Line.js'
import Recentbar from '../../components/Recentbar/Recentbar'
import Table from '../../components/Table/Table.js'
import Group from '../../components/Group/Group.js'

export default function Dashboard(props) {

    const [currentIndex, setCurrentIndex] = React.useState(0)

    const handleCardClick = (index) => {
        setCurrentIndex(index)
    }

    return (
        <main className='dashboard'>
            <header className="dashboard__topbar">
                <h3 className="dashboard__topbar__title">Dashboard</h3>
                <div className="dashboard__topbar__users">
                    <img src={Avatar} alt="user-avatar" className="dashboard__topbar__users_avatar" />
                    <span className="dashboard__topbar__users_name">Mahfuzul Nabil</span>
                    <svg width="11" height="6" viewBox="0 0 11 6" fill="none" className="dashboard__topbar__users_arrow">
                        <path d="M9.69281 0.293945H5.27989H1.30612C0.626122 0.293945 0.286122 1.11561 0.767789 1.59729L4.43698 5.26645C5.02489 5.85437 5.98114 5.85437 6.56906 5.26645L7.96448 3.87104L10.2382 1.59729C10.7128 1.11561 10.3728 0.293945 9.69281 0.293945Z" fill="#1B212D" />
                    </svg>
                </div>
            </header>
            <section className="dashboard__main">
                <section className="dashboard__main__content">
                    <div className="dashboard__main__content__cards">
                        <ul className='dashboard__main__content__cards_ul'   >
                            {
                                new Array(3).fill(0).map((item, index) => {
                                    return (
                                        <li
                                            className={
                                                `dashboard__main__content__card 
                                                    ${currentIndex === index ? 'dashboard__main__content__card--active' : ''}`
                                            }
                                            key={index}
                                            onClick={() => handleCardClick(index)}
                                        >
                                            <div
                                                className={
                                                    `dashboard__main__content__card_ellipse
                                                     ${currentIndex === index ? 'dashboard__main__content__card_ellipse--active' : ''}`
                                                }
                                            >
                                                <Balance
                                                    color={`${currentIndex === index ? '#C8EE44' : '#363A3F'}`}
                                                    balance={index !== 2}
                                                />
                                            </div>
                                            <div className="dashboard__main__content__card_total">
                                                <p className="dashboard__main__content__card_total_title">Monthly spending</p>
                                                <h1
                                                    className={
                                                        `dashboard__main__content__card_total_cost 
                                                        ${currentIndex === index ? 'dashboard__main__content__card_total_cost--active' : ''}`
                                                    }
                                                >$250.80</h1>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="dashboard__main__content__graph content--box">
                        <LineChart />
                    </div>
                    <div className="dashboard__main__content__recent content--box">
                        <Recentbar title="Recent Expenses"/>
                        <Table />
                    </div>
                </section>
                <section className="dashboard__main__wallet">
                    <Recentbar title="Recurring Expenses"/>
                    <div className="dashboard__main__wallet_item">
                        <Group imgPath={NetflixIcon}/>
                        <h1 className='dashboard__main__wallet_item_cost'>-$132,00</h1>
                    </div>
                </section>
            </section>
        </main>
    )
}
