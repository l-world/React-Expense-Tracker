import React from 'react'
import './group.css'
import NetflixIcon from '../../pages/Dashboard/Icon/nf.svg'

export default function Group({imgPath,title,subtitle}) {
    return (
        <div className="group">
            <img src={imgPath || NetflixIcon} alt="item-img" className='group__img' />
            <div className='group__content'>
                <h2 className='group__content_title'>{title || 'Netflix Subscription'}</h2>
                <p className='group__content_subtitle'>{subtitle || 'Netflix'}</p>
            </div>
        </div>
    )
}