import * as React from 'react';
import BarRectangle from './elements/BarRectangle';

export interface BarChartData {
    title?: string;
    subtitle?: string;
    data: number[];
    
}

export const BarChart = ({title, subtitle, data}: BarChartData) => (
    <div className="BarChart">
        <div className="Title">
            <p>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </p>
        </div>
        <div className="ChartData">
            {data.map((num, i) => <BarRectangle key={i} x={num} y={50 - i * 10} w={5} h={10 * i}/>)}
        </div>
    </div>
);