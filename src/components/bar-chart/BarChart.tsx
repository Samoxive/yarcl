import * as React from 'react';

export interface BarChartData {
    title?: string;
    subtitle?: string;
    data: number[];
    
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

export const BarChart = ({title, subtitle, data}: BarChartData) => (
    <div className="BarChart">

        <div className="Title">
            <p>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </p>
        </div>

        <div className="ChartData">
            <svg width={data.length * 15} height={biggestNum(data) * 10}>
                <line 
                    x1="0" 
                    x2="0" 
                    y1="0" 
                    y2={biggestNum(data) * 10} 
                    stroke="black"
                    strokeWidth="4" 
                />
            {data.map((num, i) => 
                <rect
                    key={i} 
                    x={15 * i + 3.5} 
                    y={(biggestNum(data) - num) * 10} 
                    width={7.5} 
                    height={10 * num} 
                    fill={getRandomColor()}
                />)
            }
                <line 
                    x1="0" 
                    x2={data.length * 15}
                    y1={biggestNum(data) * 10}
                    y2={biggestNum(data) * 10}
                    stroke="black"
                    strokeWidth="4" 
                />
            </svg>
        </div>
    </div>
);