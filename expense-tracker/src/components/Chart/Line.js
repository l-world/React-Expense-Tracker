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
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


export const options = {
    responsive: true,
    plugins: {
        legend: {
            labels:{
                usePointStyle:true,
                generateLabels: (chart) => {
                   const {data} = chart;
                   if( data.labels.length > 0 && data.datasets.length > 0) {
                        return data.datasets.map( (label,index) => {
                            const text = label.label;
                            return {
                                text,
                                fillStyle:label.borderColor,
                                strokeStyle:'transparent',
                                datasetIndex:index,
                                pointStyle:label.pointStyle,
                                lineWidth:label.borderWidth,
                                fontColor:"#1B212D"
                                // hidden:true,
                            }
                        })
                   }
                },
            },
            fullWidth:false,

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
            fullWidth:false,
        },
        
    },
};

export const data = {
    labels,
    datasets: [
        {
            label: 'Income',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
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
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
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

export function LineChart() {
    return <Line options={options} data={data} />;
}
