import React from 'react'
import './date.css'

export default function Date(props) {

    const [date,setDate] = React.useState('');
    const [flag,setFlag] = React.useState();

    const handleChange = (e) => {
        console.log('Date Change Event');
        const dateForamt = e.target.value.replace(/-/g, '/');
        setDate(dateForamt);
        e.target.value === '' ? setFlag(true) : setFlag(false);
        props.handleDateChange && props.handleDateChange(date);
    }

    // useEffect(() => {
    //     console.log('Date effect', props.flag);
    //     setFlag(props.flag)
    // },[props.flag])

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
                (props.flag || flag) 
                ?  
                <span className='date__text'>Date</span>
                :
                <span className='date__text text--color'>{date || props.value}</span>
            }
        </div>
    )
}
