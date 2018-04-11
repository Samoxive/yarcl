import * as React from 'react';
import './BarChart.scss';

export interface BarChartData {
    title?: string;
    subtitle?: string;
    label: string[];
    data: number[];
    color?: string;
    scale?: number;
}

function getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function biggestNum(data: number[]): number {
    return (data.length > 0) ? Math.max(...data) : 0;
}

let SI_PREFIXES = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

function numberPrefixed(num: number) {
    let tier = Math.log10(num) / 3 | 0;
    if (tier === 0) {return num; }
    let prefix = SI_PREFIXES[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = num / scale;
    return scaled.toFixed(2) + prefix;
}

function scaleXAxis(num: number | void, data: number[]) {
    let scale = num || 4;
    let texts = [];
    for (let i = 0; i <= scale; i++) {
        texts.push(
            <text
                key={i}
                x={50 + (200 * i / scale)} 
                y={data.length * 15 + 10} 
                fontSize={5}
            >
            {numberPrefixed(i * biggestNum(data) / (scale))}
            </text>);
    }
    return texts;
}
export const BarChart = ({title, subtitle, data, label, color, scale}: BarChartData) => (
    <div className="bar-chart">
        <p>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </p>

        <div className="chart-data">
            <svg viewBox={`0 0 275 ${data.length * 17}`} >
            {label.map((num, i) => <text key={i} x={0} y={i * 15 + 10} fontSize={5}>
                {num.length < 16 ? num : num.substring(0, 15) + '...'}
            </text>)}
                <line 
                    x1="50" 
                    x2="50" 
                    y1="0" 
                    y2={data.length * 15}
                    stroke="black"
                    strokeWidth="4" 
                />
            {data.map((num, i) => 
                <rect
                    key={i} 
                    x="52"
                    y={15 * i + 3.5}
                    width={10 * num / (biggestNum(data) * 10 / 200)}    
                    height="7.5" 
                    fill={color || getRandomColor()}
                />)
            }
                <line 
                    x1="48" 
                    x2="252"
                    y1={data.length * 15}
                    y2={data.length * 15}
                    stroke="black"
                    strokeWidth="4" 
                />
                {scaleXAxis(scale, data)};
            </svg>
        </div>
    </div>
);
