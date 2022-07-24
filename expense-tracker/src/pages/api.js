import {  query, where,onSnapshot } from 'firebase/firestore'
import { colRef } from '../../firebase-config'

export const getList = async ({name,operator,value}) => {
    const q = query(colRef, where(name,operator, value));
    let lists = []
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
            lists.push({ ...doc.data(), id: doc.id })
        })
      })
    return lists;
};