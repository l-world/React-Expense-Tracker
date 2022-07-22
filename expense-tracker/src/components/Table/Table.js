import React from 'react'
import './table.css'
import { getDocs } from 'firebase/firestore'
import { colRef } from '../../firebase-config'

import Group from '../Group/Group'

export default function Table(props) {

    const [list, setList] = React.useState([]);

    const handleEditClick = (id) => {
        props.onEdit && props.onEdit(id);
    }

    React.useEffect(() => {
        const getList = async () => {
            const data = await getDocs(colRef);
            setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getList();
    });

    const trElements = list.map((item, index) => {
        // console.log(item);
        return (
            <tr className='table__body_row' key={item.id}>
                <td className='table__body_column_name'>
                    <Group imgPath={item.iconUrl} title={item.title} />
                </td>
                <td className='table__body_column_text text--gray'>{item.type}</td>
                <td className='table__body_column_text text--black'>{item.amount}</td>
                <td className='table__body_column_text  text--gray'>{item.date}</td>
                {props.tableState ? <td className='table__body_column_text text--invoice'>{item.id}</td> : ''}
                {props.tableState ? <td>
                    <button
                        className='table__body_column_btn text--black table__body_column_text'
                        onClick={handleEditClick(item.id)}
                    >
                        Edit
                    </button>
                </td>
                    :
                    ''}
            </tr>
        )
    })

    return (

        <div className='table__wrap'>
            <table className='table'>
                <thead className='table__header'>
                    <tr className='table__header_row'>
                        <th>NAME/BUSINESS</th>
                        <th>TYPE</th>
                        <th>AMOUNT</th>
                        <th>DATE</th>
                        {props.tableState ? <th>INVOICE ID</th> : ''}
                        {props.tableState ? <th>ACTION</th> : ''}
                    </tr>
                </thead>
                {(list && list.length > 0) ?
                    <tbody className='table__body'>
                        {trElements}
                    </tbody>
                    :
                    ""
                }
            </table>
        </div>
    )
}
