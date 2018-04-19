import * as React from 'react';
import './AreaChart.scss';

export interface AreaChartProps {
    title?: string;
    subtitle?: string;
    label: string[];
    data: number[];
    color?: string;
    scale?: number;
}

const mar = 30;

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

function smallestNum(data: number[]): number {
    return (data.length > 0) ? Math.min(...data) : 0;
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
function polygonPoints(data: number[]) {
    let pointString = mar + ',200 ';
    let i = 0;
    for (let datum of data) {
        pointString += (mar + i) + ',' + (200 - (datum * (200 / biggestNum(data)))) + ' ';
        i += (200 / data.length);
    }
    pointString +=  mar + i - (200 / data.length) + ',200';
    return pointString;
}
export const AreaChart = ({title, subtitle, data, label, color, scale}: AreaChartProps) => (
    <div className="area-chart">
        <p>
            <h1>{title}</h1>
            <h2>{subtitle}</h2>
        </p>
        <div className="chart-data">
            <svg viewBox={`0 0 275 250`} >
                {/*Y axis*/}
                <line 
                    x1={mar - 2}
                    x2={mar - 2} 
                    y1="0" 
                    y2="200"
                    stroke="black"
                    strokeWidth="4" 
                />
                {/*Polygon*/}
                {/*<polygon points="0,100 50,25 50,75 100,0" />*/}
                <polygon 
                    points={polygonPoints(data)}
                    fill={'red'}
                />
                )}
                {/*X axis*/}
                <line 
                    x1={mar - 4} 
                    x2={200 + mar}
                    y1="200"
                    y2="200"
                    stroke="black"
                    strokeWidth="4" 
                />

            </svg>
        </div>
    </div>
);
