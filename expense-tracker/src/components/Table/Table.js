import React from 'react'
import './table.css'

import Group from '../Group/Group'
import Mask from '../Mask/Mask'
import Edit from '../Form/ExpenseForm'

export default function Table(props) {

    const [maskStatus, setMaskStatus] = React.useState(false)

    const handleClick = () => {
        setMaskStatus(true);
    }

    const handleCloseMask = () => {
        setMaskStatus(false)
    }

    return (
        <>
            <div className='table__wrap'>
                <table className='table'>
                    <thead className='table__header'>
                        <tr className='table__header_row'>
                            <th>NAME/BUSINESS</th>
                            <th>TYPE</th>
                            <th>AMOUNT</th>
                            <th>DATE</th>
                            {props.show ? <th>INVOICE ID</th> : ''}
                            {props.show ? <th>ACTION</th> : ''}
                        </tr>
                    </thead>
                    <tbody className='table__body'>
                        <tr className='table__body_row'>
                            <td className='table__body_column_name'>
                                <Group />
                            </td>
                            <td className='table__body_column_text text--gray'>Mobile</td>
                            <td className='table__body_column_text text--black'>$420.84</td>
                            <td className='table__body_column_text  text--gray'>14 Apr 2022</td>
                            {props.show ? <td className='table__body_column_text text--invoice'>MGL0124877</td> : ''}
                            {props.show ? <td>
                                <button
                                    className='table__body_column_btn text--black table__body_column_text'
                                    onClick={handleClick}
                                >
                                    Edit
                                </button>
                            </td>
                                :
                                ''}
                        </tr>
                    </tbody>
                </table>
            </div>
            {
                maskStatus && 
                <Mask
                    onClose={ handleCloseMask }
                >
                    <Edit formType={'edit'}/>
                </Mask>
            }

        </>
    )
}
