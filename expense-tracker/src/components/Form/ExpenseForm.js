import React from 'react'
import './index.css'
import Date from '../Date/Date.js';
import { options } from './type-options.js'

export default function Add(props) {

    const [isSelected, setIsSelected] = React.useState('');

    const [costItem, setCostItem] = React.useState({
        title: "",
        amount: "",
        type: "",
        date: "",
        recur: "",
        iconUrl: "",
    })

    const handleAdd = (e) => {
        e.preventDefault();
        console.log(costItem);
        props.onAdd && props.onAdd(costItem);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.onCancel && props.onCancel();
    };

    const handleSave = (e) => {
        e.preventDefault();
        props.onSave && props.onSave();
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if(type === 'select-one'){
            setIsSelected('selected') 
        }
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
                    name="title" value={costItem.title} onChange={ handleInputChange } />
                <input type="text" placeholder='Amount' className='form__input' 
                    name="amount" value={costItem.amount} onChange={handleInputChange} />
                <select className={`form__select form__input ${isSelected}`}
                    name="type" value={costItem.type} onChange={handleInputChange}
                >
                    <option value="">Type</option>
                    {optionElements}
                </select>
                <div className='form__row'>
                    <Date 
                        handleDateChange={ handleDateChange }
                    />
                    <label className='form__row__checkbox'>Recurring
                        <input type="checkbox" className='form__row__checkbox_input' 
                            name="recur" value={costItem.recur} onChange={handleInputChange} />
                        <span className='form__row__checkbox_checkmark'></span>
                    </label>
                </div>
                <div className='form__img_upload_btn'>
                    <input type="file" className='form__img_upload_btn_input' 
                        name="iconUrl" value={costItem.iconUrl} onChange={handleInputChange} />
                    <img src={costItem.iconUrl} className='form__img_show' alt="icon" />
                </div>
                {
                    props.formType === 'edit' 
                    ? 
                    <div className="form__btn__edit">
                        <button className='form__btn__edit_cancel form__btn' onClick={ handleCancel }>Cancel</button>
                        <button className='form__btn__edit_save form__btn' onClick={ handleSave }>Save</button>
                    </div>
                    :
                    <button 
                        className='form__btn__add form__btn' 
                        onClick={ handleAdd }
                    >Add</button>                    
                }
                
            </form>
        </div>
    )
}
