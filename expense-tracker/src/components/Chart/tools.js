import { getLineData } from '../../api.js'

export const formatMonth = (month) => {
    switch (month) {
        case '01':
            return 'Jan';
        case '02':
            return 'Feb';
        case '03':
            return 'Mar';
        case '04':
            return 'Apr';
        case '05':
            return 'May';
        case '06':
            return 'Jun'
        case '07':
            return 'Jul';
        case '08':
            return 'Aug';
        case '09':
            return 'Sep';
        case '10':
            return 'Oct';
        case '11':
            return 'Nov';
        case '12':
            return 'Dec';
        default:
            console.log(`Sorry, we are out of ${month}.`);
    }
}

export const generateSats = async (period) => {
    const data = await getLineData(period);
    let temp = {},
        labels = [],
        income = [],
        expense = [];
    data.forEach(line => {
        const dateArr = line.date.split('/');
        const month = formatMonth(dateArr[1]);
        const day = dateArr[2]
        const dateRes = `${month} ${day}`;
        if (temp[dateRes]) {
            temp[dateRes] += (+line.amount);
        } else {
            temp[dateRes] = (+line.amount);
        }
    })
    // console.log(temp);
    for (const key in temp) {
        labels.push(key);
        if (temp[key] > 0) {
            income.push(temp[key]);
            expense.push(0);
        }
        if (temp[key] < 0) {
            expense.push(Math.abs(temp[key]));
            income.push(0);
        }
    }
    labels = labels.reverse();
    income = income.reverse();
    expense = expense.reverse();
    console.log(labels,income, expense);
    return {
        labels,
        income,
        expense
    }
}