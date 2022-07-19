import React from 'react'
import './date.css'

export default function Date(props) {

    const [date,setDate] = React.useState(props.value);
    const [flag,setFlag] = React.useState(true);

    const handleChange = (e) => {
        const date = e.target.value.replace(/-/g, '/');
        setDate(date);
        e.target.value === '' ? setFlag(true) : setFlag(false);
        props.handleDateChange && props.handleDateChange(date);
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
                <span className='date__text text--color'>{date}</span>
            }
        </div>
    )
}
