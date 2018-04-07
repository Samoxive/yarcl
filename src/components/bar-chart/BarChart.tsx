import * as React from 'react';

export interface BarChartData {
    title?: string;
    subtitle?: string;
    label: string[];
    data: number[];
    color?: string;
    
}
function getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function biggestNum(data: number[]): number {
    var bigNum = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i] > bigNum) {
            bigNum = data[i];
        }
    }
    return bigNum;
}

export const BarChart = ({title, subtitle, data, label, color}: BarChartData) => (
    <div className="bar-chart">
        <div className="chart-title">
            <p>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </p>
        </div>

        <div className="chart-data">
            <svg viewBox={`0 0 ${biggestNum(data) * 10 + 60} ${data.length * 17}`} >
            {label.map((num, i) => <text id="label-text" key={i} x={0} y={i * 15 + 10} fontSize={5}>
                {num.length < 16 ? num : num.substring(0, 15) + '...'}
            </text>)}
                <line 
                    x1={50} 
                    x2={50} 
                    y1="0" 
                    y2={data.length * 15}
                    stroke="black"
                    strokeWidth="4" 
                />
            {data.map((num, i) => 
                <rect
                    key={i} 
                    x={52}
                    y={15 * i + 3.5}
                    width={10 * num}    
                    height={7.5} 
                    fill={color || getRandomColor()}
                />)
            }
                <line 
                    x1="48" 
                    x2={biggestNum(data) * 10 + 52}
                    y1={data.length * 15}
                    y2={data.length * 15}
                    stroke="black"
                    strokeWidth="4" 
                />
                <text x={50} y={data.length * 15 + 10} fontSize={5}>0</text>
                <text x={biggestNum(data) * 5 + 50} y={data.length * 15 + 10} fontSize={5}>{biggestNum(data) / 2}</text>
                <text x={biggestNum(data) * 10 + 50} y={data.length * 15 + 10} fontSize={5}>{biggestNum(data)}</text>
            </svg>
        </div>
    </div>
);