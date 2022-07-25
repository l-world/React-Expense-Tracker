import {  getDocs,query, where,onSnapshot } from 'firebase/firestore'
import { colRef } from '../firebase-config'


export const getList = async () => {
    const data = await getDocs(colRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const filter = async ({name,operator,value}) => {
    const q = query(colRef, where(name,operator, value));
    let lists = []
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
            lists.push({ ...doc.data(), id: doc.id })
        })
      })
    return lists;
};

export const expenseStat = async () => {
    const data = await getList();
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    let curdate
    if(month < 10){
         curdate = `${year}/0${month}/${day}`;
    }else {
        curdate = `${year}/${month}/${day}`;
    }
    
    let TotalSpend = 0;
    let MonthlySpend = 0;
    let DailySpend = 0;

    data.forEach(  spend => {
        TotalSpend += (+spend.amount);
        if(spend.date.includes(month)){
            MonthlySpend += (+spend.amount);
        }
        if(spend.date === curdate){
            DailySpend += (+spend.amount);
        }
    });
    return [
        TotalSpend,
        MonthlySpend,
        DailySpend
    ]
}

