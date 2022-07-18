import React from 'react'
import './index.css'
import Date from '../Date/Date.js';
import { options } from './option-data.js'

export default function Add(props) {

    const [costItem, setCostItem] = React.useState({
        title: "",
        amount: "",
        type: "",
        date: "",
        recur: "",
        iconUrl: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(costItem);
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setCostItem({
            ...costItem, 
            [name]: type === 'checkbox' ? checked : value 
        })
    };

    const handleDateChange = (date) => {
        setCostItem({ ...costItem, date: date });
    }

    const optionElements = options.map(item => {
        return <option key={item.value} value={item.value}>{item.label}</option>
    })

    return (
        <div className='form__group'>
            <form className='form'>
                <input type="text" placeholder='Title' className='form__input' 
                    name="title" value={costItem.title} onChange={ handleChange } />
                <input type="text" placeholder='Amount' className='form__input' 
                    name="amount" value={costItem.amount} onChange={handleChange} />
                <select className='form__select form__input'
                    name="type" value={costItem.type} onChange={handleChange}
                >
                    <option value="">Type</option>
                    {optionElements}
                </select>
                <div className='form__row'>
                    <Date 
                        onChange={ handleDateChange }
                    />
                    <label className='form__row__checkbox'>Recurring
                        <input type="checkbox" className='form__row__checkbox_input' 
                            name="recur" value={costItem.recur} onChange={handleChange} />
                        <span className='form__row__checkbox_checkmark'></span>
                    </label>
                </div>
                <div className='form__img_upload_btn'>
                    <input type="file" className='form__img_upload_btn_input' 
                        name="iconUrl" value={costItem.iconUrl} onChange={handleChange} />
                    <img src={costItem.iconUrl} className='form__img_show' alt="icon" />
                </div>
                {
                    props.formType === 'edit' 
                    ? 
                    <div className="form__btn__edit">
                        <button className='form__btn__edit_cancel form__btn'>Cancel</button>
                        <button className='form__btn__edit_save form__btn'>Save</button>
                    </div>
                    :
                    <button 
                        className='form__btn__add form__btn' 
                        onClick={handleSubmit}
                    >Add</button>                    
                }
                
            </form>
        </div>
    )
}
