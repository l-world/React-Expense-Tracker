import React from 'react'
import './mask.css'

export default function Mask(props) {
    return (
        <div className='mask'
            onClick={e => {
                if (e.target.className === 'mask') {
                    props.onClose()
                }
            }}
        >
            {props.children}
        </div>

    )
}
