import React from 'react'
import './date.css'

export default function Date(props) {

    const [date,setDate] = React.useState(props.value);
    const [flag,setFlag] = React.useState(true);

    const handleChange = (e) => {
        const date = e.target.value.replace(/-/g, '/');
        props.onChange && props.onChange(date);
        setDate(date);
        setFlag(false);
    }

    return (
        <div className='date'>
            <input
                type="date"
                id='date'
                className='date__input'
                value={props.value}
                onChange={handleChange}
            />
            {
                flag 
                ?  
                <span className='date__text'>Date</span>
                :
                <span className='date__text text--color'>{date || 'sdjfsl'}</span>
            }
        </div>
    )
}
