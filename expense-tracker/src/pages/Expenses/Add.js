import React from 'react'

export default function Add() {
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div className='form__group'>
            <form className='form'>
                <input type="text" placeholder='Title' className='form__input' />
                <input type="text" placeholder='Amount' className='form__input' />
                <select className='form__select form__input'>
                    <option value="">Type</option>
                    <option value="">111</option>
                    <option value="">222</option>
                </select>
                <div className='form__row'>
                    <input type="date" className='form__row_date form__input'/>

                    <label className='form__row__checkbox'>Recurring
                        <input type="checkbox" className='form__row__checkbox_input'/>
                        <span className='form__row__checkbox_checkmark'></span>
                    </label>
                </div>
                <div className='form__img_upload_btn'>
                    <input type="file" className='form__img_upload_btn_input'/>
                </div>
                <button className='form__submit' onClick={ handleSubmit }>Add</button>
            </form>
        </div>
    )
}
