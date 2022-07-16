import React from 'react'
import './recentbar.css'

export default function RecentBar(props) {
    return (
        <div className="recent__bar">
            <h4 className='recent__bar_title'>{props.title || 'Recurring Expenses'}</h4>
            <button className='recent__bar_btn' onClick={ props.viewAll } >
                <h6 className='recent__bar_btn_text'>View All</h6>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" >
                    <path d="M0.442382 1.5575L3.87738 5L0.442383 8.4425L1.49988 9.5L5.99988 5L1.49988 0.5L0.442382 1.5575Z" fill="#29A073" />
                </svg>
            </button>
        </div>
    )
}
