import React from 'react'
import './dashboard.css'
import { getDocs } from 'firebase/firestore'
import { colRef } from '../../firebase-config'

import Balance from './Icon/Balance'
import NetflixIcon from './Icon/nf.svg'
import Topbar from '../../components/Topbar/Topbar'
import { LineChart } from '../../components/Chart/Line.js'
import Recentbar from '../../components/Recentbar/Recentbar'
import Table from '../../components/Table/Table.js'
import Group from '../../components/Group/Group.js'

import { expenseStat } from '../api.js'

const titles = ['Total spending', 'Monthly spending', 'Daily spending'];

export default function Dashboard(props) {

    const [list, setList] = React.useState([]);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [spending, setSpending] = React.useState([])

    React.useEffect(() => {
        const getList = async () => {
            const data = await getDocs(colRef);
            setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getList()
    }, []);

    React.useEffect(() => {
        async function getSpending() {
            const spending = await expenseStat();
            const result = spending.map( (item,index) => {
                return {
                    title: titles[index],
                    value:item
                }
            })
            setSpending(result); 
        }
        getSpending();
    }, []);

    const handleCardClick = (index) => {
        setCurrentIndex(index)
    }

    return (
        <main className='dashboard'>
            <Topbar headTitle={'Dashboard'} />
            <section className="dashboard__main">
                <section className="dashboard__main__content">
                    <div className="dashboard__main__content__cards">
                        <ul className='dashboard__main__content__cards_ul'   >
                            {
                                spending.map((item, index) => {
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
                                                <p className="dashboard__main__content__card_total_title">{item.title}</p>
                                                <h1
                                                    className={
                                                        `dashboard__main__content__card_total_cost 
                                                        ${currentIndex === index ? 'dashboard__main__content__card_total_cost--active' : ''}`
                                                    }
                                                >{'$' + item.value}</h1>
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
                        <Recentbar title="Recent Expenses" />
                        <Table list={list} />
                    </div>
                </section>
                <section className="dashboard__main__wallet">
                    <Recentbar title="Recurring Expenses" />
                    <div className="dashboard__main__wallet_item">
                        <Group imgPath={NetflixIcon} />
                        <h1 className='dashboard__main__wallet_item_cost'>-$132,00</h1>
                    </div>
                </section>
            </section>
        </main>
    )
}
