import * as React from 'react';

export interface LineChartData {
    data: number[];
}

export const LineChart = ({data}: LineChartData) => (
    <svg>
        {data.map((num, i) => <circle key={i} cx={i * 10 + 10} cy={100 - data[i]} r="1" fill="black"/>)}
    </svg>
);
