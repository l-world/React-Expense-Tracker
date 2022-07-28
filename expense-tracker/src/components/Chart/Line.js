import React from 'react';
import { getLineData } from '../../api';
import { formatMonth } from './tools'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            labels: {
                usePointStyle: true,
                generateLabels: (chart) => {
                    const { data } = chart;
                    if (data.labels.length > 0 && data.datasets.length > 0) {
                        return data.datasets.map((label, index) => {
                            const text = label.label;
                            return {
                                text,
                                fillStyle: label.borderColor,
                                strokeStyle: 'transparent',
                                datasetIndex: index,
                                pointStyle: label.pointStyle,
                                lineWidth: label.borderWidth,
                                fontColor: "#1B212D"
                                // hidden:true,
                            }
                        })
                    }
                },
            },
            fullWidth: false,
        },
        title: {
            display: true,
            text: 'Working Capital',
            align: 'start',
            color: '#1B212D',
            font: {
                family: 'Kumbh Sans',
                weight: 600,
                size: '18px',
            },
            fullWidth: false,
        },
        scales: {
            y: {

            },
            suggestedMin: 0,
            suggestedMax: 1000
        }
    },
};

export const data = {
    datasets: [
        {
            label: 'Income',
            data: [],
            borderColor: '#29A073',
            borderWidth: 2,
            pointStyle: 'circle',
            pointBackgroundColor: '#5243AA',
            pointRadius: 5,
            pointBorderWidth: 2,
            pointBorderColor: '#FFF',
        },
        {
            label: 'Expenses',
            data: [],
            borderColor: '#C8EE44',
            borderWidth: 2,
            pointStyle: 'circle',
            pointBackgroundColor: '#5243AA',
            pointRadius: 5,
            pointBorderWidth: 2,
            pointBorderColor: '#FFF',
        },
    ],
};

export function LineChart(props) {
    const generateSats = async () => {
        const lineData = await getLineData(props.period || 7);
        let temp = {},
            labels = [],
            income = [],
            expense = [];
        lineData.forEach(line => {
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
/*         console.log(labels, income, expense); */
        data.labels = labels;
        data.datasets[0].data = income;
        data.datasets[1].data= expense;
    }

    generateSats();

    // React.useEffect(() => {
        
    // })
    return <Line options={options} data={data} />;
}
