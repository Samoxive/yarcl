
import * as React from 'react';
import { getCircleCoordinates } from './utils';

export interface PieChartData {
    label: string;
    value: number;
}

export interface PieChartProps {
    title: string;
    data: PieChartData[];
}

function getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const PieChart = ({title, data}: PieChartProps) => {
    let coords = getCircleCoordinates(data);

    return (
        <svg viewBox="0 0 2 2">
            {coords.map((c, i) => (
                <path
                    key={i}
                    d={`M ${c.p1.x} ${c.p1.y}
                        A 1 1 0 ${c.percentage > 0.5 ? 1 : 0} 1 ${c.p2.x} ${c.p2.y}
                        L 1 1`}
                    fill={getRandomColor()}
                />
            ))}
        </svg>
    );
};
