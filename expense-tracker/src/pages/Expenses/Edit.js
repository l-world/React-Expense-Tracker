import React from 'react'
import { db } from '../../firebase-config'
import { updateDoc,doc } from 'firebase/firestore'

import Mask from '../../components/Mask/Mask.js';
import Forms from '../../components/Form/ExpenseForm.js';

export default function ExForm(props) {

    const onSave = async (costItem) => {
        const expenseDoc = doc(db, "expense", props.item.id);
        await updateDoc(expenseDoc, costItem);
        props.onCloseMask();
        alert('Edited successfully');
        //刷新列表
    };
    
    const onCanel = async () => {
        props.onCloseMask();
    }
    
    return (
        <>
            {
                props.maskStatus && 
                <Mask onClose={props.onCloseMask}>
                    <Forms  formType={props.formType} onSave={onSave} onCancel={onCanel} data={props.item}/>
                </Mask>
            }
        </>
    )
}
