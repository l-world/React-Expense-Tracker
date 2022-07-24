import React from 'react'
import './mask.css'

export default function Mask(props) {

    const handleClose = (e) => {
        if (e.target.className ==='mask') {
            props.onClose()
        }
    }

    return (
        <div className='mask' onClick={ handleClose } >
            {props.children}
        </div>

    )
}
