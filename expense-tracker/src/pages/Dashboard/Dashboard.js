import React from 'react'
import './dashboard.css'

import Balance from './Icon/Balance'
import Topbar from '../../components/Topbar/Topbar'
import { LineChart } from '../../components/Chart/Line.js'
import Recentbar from '../../components/Recentbar/Recentbar'
import Table from '../../components/Table/Table.js'
import Group from '../../components/Group/Group.js'

import { getExpenseStat,getRecurList, getRecentList } from '../../api'
const titles = ['Total spending', 'Monthly spending', 'Daily spending'];

export default function Dashboard() {

    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [recentlist, setRecentList] = React.useState([]);
    const [recurList,setRecurList] = React.useState([]);
    const [spending, setSpending] = React.useState([]);
    const [period, setPeriod] = React.useState('');

    React.useEffect(() => {
        const getList = async () => {
            const data = await getRecentList();
            setRecentList(data);
        };
        getList()
    }, []);

    React.useEffect(() => {
        async function getSpending() {
            const spending = await getExpenseStat();
            setSpending(spending); 
        }
        getSpending();
    }, []);

    React.useEffect(() => {
        async function getRecurring() {            
            const data = await getRecurList();
            setRecurList(data);
        }
        getRecurring();
    },[]);

    // React.useEffect(() => {
    //     async function getLines() {            
    //         const data = await getLineData('7');  //默认展示近7天的数据
    //         setLineData(data);
    //     }
    //     getLines();
    // },[]);

    const handleCardClick = (index) => {
        setCurrentIndex(index)
    }

    const handlePeriodChange = async (e) => {
        setPeriod(e.target.value);
    }

    return (
        <main className='dashboard'>
            <Topbar headTitle={'Dashboard'} />
            <section className="dashboard__main">
                <section className="dashboard__main__content">
                    <div className="dashboard__main__content__cards">
                        <ul className='dashboard__main__content__cards_ul'   >
                            {
                                titles.map((title, index) => {
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
                                                <p className="dashboard__main__content__card_total_title">{title}</p>
                                                <h1
                                                    className={
                                                        `dashboard__main__content__card_total_cost 
                                                        ${currentIndex === index ? 'dashboard__main__content__card_total_cost--active' : ''}`
                                                    }
                                                >{'$' + (spending[index] || 0) }</h1>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="dashboard__main__content__graph content--box">
                        <select name="period" id="period" onChange={ handlePeriodChange }>
                            <option value="7">Last 7 days</option>
                            <option value="1">Last 1 months</option>
                            <option value="3">Last 3 months</option>
                            <option value="6">Last 6 monthss</option>
                            <option value="12">Last 12 months</option>
                        </select>
                        <LineChart period={period}/>
                    </div>
                    <div className="dashboard__main__content__recent content--box">
                        <Recentbar title="Recent Expenses" />
                        <Table list={recentlist} />
                    </div>
                </section>
                <section className="dashboard__main__wallet">
                    <Recentbar title="Recurring Expenses" />
                    <div className="dashboard__main__wallet_box">
                        {
                            recurList.map( (item,index) => {
                                return (
                                    <div  key={item.id} className="dashboard__main__wallet_item">
                                    <Group imgPath={item.iconpath} title={item.title}/>
                                    <h1 className='dashboard__main__wallet_item_cost'>{item.amount}</h1>
                                    </div>
                                )
                            })
                        }
                    </div>
                </section>
            </section>
        </main>
    )
}
