import * as React from 'react';

export interface BarChartData {
    title?: string;
    subtitle?: string;
    label: string[];
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

export const BarChart = ({title, subtitle, data, label}: BarChartData) => (
    <div className="BarChart">

        <div className="Title">
            <p>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
            </p>
        </div>

        <div className="Labels">
            {label.map((num, i) => 
                <Text key={i}>{num}</Text>
            )
            }
        </div>

        <div className="ChartData">
            <svg width={data.length * 15} height={biggestNum(data) * 10}>
                <line 
                    x1="0" 
                    x2="0" 
                    y1="0" 
                    y2={data.length * 15}
                    stroke="black"
                    strokeWidth="4" 
                />
            {data.map((num, i) => 
                <rect
                    key={i} 
                    x={2}
                    y={15 * i + 3.5}
                    width={10 * num}    
                    height={7.5} 
                    fill={getRandomColor()}
                />)
            }
                <line 
                    x1="0" 
                    x2={biggestNum(data) * 10}
                    y1={data.length * 15}
                    y2={data.length * 15}
                    stroke="black"
                    strokeWidth="4" 
                />
            </svg>
        </div>
    </div>
);