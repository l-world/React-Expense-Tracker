import React, { useEffect } from 'react'
import './index.css'

import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase-config";

import Date from '../Date/Date.js';
import ImgUpload from '../Upload/ImgUpload.js'
import { options } from './type-options.js'

export default function Add(props) {

    const [isSelected, setIsSelected] = React.useState('');
    const [progress, setProgress] = React.useState(0);

    const [costItem, setCostItem] = React.useState({
        title: "",
        amount: "",
        type: "",
        date: "",
        recur: "",
        iconUrl: "",
    })

    useEffect(() => {
        if(props.data){
            setCostItem( prev => {
                return{
                    ...prev,
                    ...props.data
                }
            })
        }
    },[props.data]);

    const isAdded = () => {
        for (const key in costItem) {
            if (!costItem[key] && key !== "recur" && key !== "iconUrl") {
                return false;
            }
        }
        return true;
    }

    const handleAdd = (e) => {
        e.preventDefault();
        if(isAdded()){
            props.onAdd && props.onAdd(costItem);
        }else{
            alert("Please fill in the item");
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        props.onCancel && props.onCancel();
    };

    const handleSave = (e) => {
        e.preventDefault();
        props.onSave && props.onSave(costItem);
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'select-one') {
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

    const uploadFile = async (file) => {
        if (!file) {
            alert("image is null");
            return;
        }
        const imageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(imageRef, file);
        uploadTask.on( "state_changed",(snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(percent);
            },
            (err) => console.log('error',err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setCostItem({ ...costItem, iconUrl: url });
                });
            }
        );
    };

    const optionElements = options.map(item => {
        return <option key={item.value} value={item.value}>{item.label}</option>
    })

    return (
        <div className='form__group'>
            <form className='form'>
                <input type="text" placeholder='Title' className='form__input'
                    name="title" value={costItem.title} onChange={handleInputChange} />
                <input type="text" placeholder='Amount' className='form__input'
                    name="amount" value={costItem.amount} onChange={handleInputChange} />
                <select className={`form__select form__input ${isSelected} ${ (props.data && props.data.type) ? 'selected' : ''}`}
                    name="type" value={costItem.type} onChange={handleInputChange}
                >
                    <option value="">Type</option>
                    {optionElements}
                </select>
                <div className='form__row'>
                    <Date
                        handleDateChange={handleDateChange}
                        flag={ (props.data && props.data.date) ? false : true}
                        value={props.data && props.data.date} 
                    />
                    <label className='form__row__checkbox'>Recurring
                        <input type="checkbox" className='form__row__checkbox_input'
                            name="recur" value={costItem.recur} onChange={handleInputChange} checked={costItem.recur || (props.data && props.data.recur)}/>
                        <span className='form__row__checkbox_checkmark'></span>
                    </label>
                </div>

                <ImgUpload uploadFile={uploadFile} progress={progress} imageUrl={costItem.iconUrl}/>

                {
                    props.formType === 'edit'
                        ?
                        <div className="form__btn__edit">
                            <button className='form__btn__edit_cancel form__btn' onClick={handleCancel}>Cancel</button>
                            <button className='form__btn__edit_save form__btn' onClick={handleSave}>Save</button>
                        </div>
                        :
                        <button
                            className='form__btn__add form__btn'
                            onClick={handleAdd}
                        >Add</button>
                }

            </form>
        </div>
    )
}
