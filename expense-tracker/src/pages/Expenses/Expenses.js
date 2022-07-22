import React, { useState } from 'react'
import './expense.css'
import { addDoc } from 'firebase/firestore'
import {colRef} from '../../firebase-config'
import { useAuth } from '../../components/AuthContext'


import Topbar from '../../components/Topbar/Topbar'
import Table from '../../components/Table/Table'
import Mask from '../../components/Mask/Mask'
import Add from '../../components/Form/ExpenseForm.js'

export default function Expenses() {
    const { currentUser } = useAuth()

    const [maskStatus, setMaskStatus] = useState(false);
    

    const handleCreate = () => {
        setMaskStatus(true)
    }

    const handleCloseMask = () => {
        setMaskStatus(false)
    }

    const onAdd = async (costItem) => {
        console.log('add');
        console.log(costItem);
        await addDoc(colRef, costItem);
    };

    // React.useEffect(() => {
    //     const getList = async () => {
    //       const data = await getDocs(colRef);
    //       setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    
    //     getList();
    //   }, []);


    return (
        <>
            <main className="expenses">
                <Topbar headTitle="Expenses" avatar={currentUser.photoURL} username={currentUser.displayName}/>
                <section className='expenses__main'>
                    <div className="expenses__main__search">
                        <input type="text" className="expenses__main__search_input" placeholder='Search anything on Transactions' />
                        <button className="expenses__main__search_create search__btn" onClick={handleCreate}>
                            <svg className='search__btn_icon' width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 13.1667H3V11.5001H13V13.1667ZM13 9.83342H3V8.16675H13V9.83342ZM13 6.50008H3V4.83342H13V6.50008ZM0.5 17.3334L1.75 16.0834L3 17.3334L4.25 16.0834L5.5 17.3334L6.75 16.0834L8 17.3334L9.25 16.0834L10.5 17.3334L11.75 16.0834L13 17.3334L14.25 16.0834L15.5 17.3334V0.666748L14.25 1.91675L13 0.666748L11.75 1.91675L10.5 0.666748L9.25 1.91675L8 0.666748L6.75 1.91675L5.5 0.666748L4.25 1.91675L3 0.666748L1.75 1.91675L0.5 0.666748V17.3334Z" fill="#1B212D" />
                            </svg>
                            <span className='search__btn_text'>Create Expense</span>
                        </button>
                        <button className="expenses__main__search_filter search__btn">
                            <svg className='search__btn_icon' width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.8335 4.16659H11.1668V5.83325H2.8335V4.16659ZM0.333496 0.833252H13.6668V2.49992H0.333496V0.833252ZM5.3335 7.49992H8.66683V9.16658H5.3335V7.49992Z" fill="#1B212D" />
                            </svg>
                            <span className='search__btn_text'>Filters</span>
                        </button>
                    </div>

                    <Table show={true} />
                </section>
            </main>
            {
                maskStatus 
                && 
                <Mask onClose={ handleCloseMask } >
                    <Add onAdd={onAdd} />
                </Mask>
            }
        </>
    )
}
