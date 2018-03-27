import * as React from 'react';
import BarRectangle from './elements/BarRectangle';

export interface BarChartData {
    data: number[];
}

export const BarChart = ({data}: BarChartData) => (
    <div className="BarC">
        {data.map((num, i) => <BarRectangle key={i} x={num} y={50 - i * 10} w={5} h={10 * i}/>)}
    </div>
);