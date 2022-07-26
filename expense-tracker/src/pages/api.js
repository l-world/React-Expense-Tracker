import { query, orderBy, getDocs } from 'firebase/firestore'
import { colRef } from '../firebase-config'


export const getList = async () => {
    const q = query(colRef,orderBy('date', 'desc')); //默认按日期降序排序
    const data = await getDocs(q);
    const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return result;
};

// export const filterList = async ({value}) => {
//     console.log(value);
//     const q = query(colRef, where('amount','==',value),orderBy('date', 'desc'));
//     const data = await getDocs(q);
//     const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
//     return result;
// };

//Recent Expenses
export const getRecentList = async () => {
    const data = await getList();
    return data.filter( (item,index) => index < 5)
}

//Recurring Expenses
export const getRecurList = async () => {
    const data = await getList();
    return data.filter(item => item.recur);
}

// spending total
export const getExpenseStat = async () => {
    const data = await getList();
    const nowDate = new Date();
    const year = nowDate.getFullYear();
    const month = nowDate.getMonth() + 1;
    const day = nowDate.getDate();
    let curdate
    if (month < 10) {
        curdate = `${year}/0${month}/${day}`;
    } else {
        curdate = `${year}/${month}/${day}`;
    }

    let TotalSpend = 0;
    let MonthlySpend = 0;
    let DailySpend = 0;

    data.forEach(spend => {
        TotalSpend += (+spend.amount);
        if (spend.date.includes(month)) {
            MonthlySpend += (+spend.amount);
        }
        if (spend.date === curdate) {
            DailySpend += (+spend.amount);
        }
    });
    return [
        TotalSpend,
        MonthlySpend,
        DailySpend
    ]
}