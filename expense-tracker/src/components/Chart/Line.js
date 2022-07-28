import React from 'react';
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

import { generateSats } from './tools.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
// const lineData = await getLineData();
const stats = generateSats();
const labels = stats.labels;
const income = stats.income;
const expense = stats.expense;

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
        scales:{
            y:{

            },
            suggestedMin: 0,
            suggestedMax: 1000
        }
    },
};

export const data = {
    labels,
    datasets: [
        {
            label: 'Income',
            data: income,
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
            data: expense,
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
    console.log(props.period);
    return <Line options={options} data={data} />;
}
