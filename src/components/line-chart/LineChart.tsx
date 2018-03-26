import * as React from 'react';

export interface LineChart {
    data: number[];
}
export const Line = ({data}: LineChart) => (
    <svg>
        {data.map((num, i) => <circle key={i} cx={i * 10 + 10} cy={100 - data[i]} r="1" fill="black"/>)}
    </svg>
);
