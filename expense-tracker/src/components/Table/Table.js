import React from 'react'
import './table.css'

import Group from '../Group/Group'

export default function Table(props) {
    return (
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
                        <td className='table__body_row_name'>
                            <Group />
                        </td>
                        <td className='table__body_row_text text--gray'>Mobile</td>
                        <td className='table__body_row_text text--black'>$420.84</td>
                        <td className='table__body_row_text  text--gray'>14 Apr 2022</td>
                        {props.show ? <td>MGL0124877</td> : ''}
                        {props.show ? <td><button>Edit</button></td> : ''}
                    </tr>
                    <tr className='table__body_row'>
                        <td className='table__body_row_name'>
                            <Group />
                        </td>
                        <td className='table__body_row_text text--gray'>Entertainment</td>
                        <td className='table__body_row_text text--black'>$420.84</td>
                        <td className='table__body_row_text  text--gray'>14 Apr 2022</td>
                        {props.show ? <td>MGL0124877</td> : ''}
                        {props.show ? <td><button>Edit</button></td> : ''}
                    </tr>
                    <tr className='table__body_row'>
                        <td className='table__body_row_name'>
                            <Group />
                        </td>
                        <td className='table__body_row_text text--gray'>Mobile</td>
                        <td className='table__body_row_text text--black'>$420.84</td>
                        <td className='table__body_row_text  text--gray'>14 Apr 2022</td>
                        {props.show ? <td>MGL0124877</td> : ''}
                        {props.show ? <td><button>Edit</button></td> : ''}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
