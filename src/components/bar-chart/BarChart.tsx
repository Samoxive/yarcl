import * as React from 'react';
import './BarChart.scss';
import '../common.scss';
import { getColorGenerator } from '../../utils/colors';

export interface BarChartData {
    title?: string;
    subtitle?: string;
    label: string[];
    data: number[];
    color?: string;
    scale?: number;
}

const marX = 50; // margin X
const marY = 50;
const chartX = 250; // chart X
const gap = 20; // gap size
const barSize = 20; // barSize SHOULD NOT BE bigger than gap.
const labelX = 5; // x axis label size
const labelY = 10; // y axis scale size

function biggestNum(data: number[]): number {
    return (data.length > 0) ? Math.max(...data) : 0;
}

{/* Credits: Waylon Flinn 
  * Stackoverflow.com licensed under Creative Commons Attribution-Share Alike
  */}

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
                className="chart-scale"
                x={marX + (chartX * i / scale)} 
                y={data.length * gap + labelY + marY}
            >
            {numberPrefixed(i * biggestNum(data) / (scale))}
            </text>);
    }
    return texts;
}
export const BarChart = ({title, subtitle, data, label, color, scale}: BarChartData) => {
    const colorGenerator = getColorGenerator();
    return (
        <div className="bar-chart">
            <div className="chart-title">{title}</div>
            <div className="chart-subtitle">{subtitle}</div>

            <div className="chart-data">
                <svg viewBox={`0 0 ${chartX + 75 + marX} ${data.length * gap + marY + 50}`} >
                {label.map((num, i) => 
                    <text 
                        key={i}
                        x={labelX} 
                        y={(i + 2 / 3) * gap + marY}
                    >
                        {num.length < marX * (16 / 50) ? num : num.substring(0, (marX * 15 / 50)) + '...'}
                    </text>
                )}
                    <line 
                        x1={marX} 
                        x2={marX}
                        y1={marY}
                        y2={data.length * gap + marY}
                        stroke="black"
                        strokeWidth="4" 
                    />
                {data.map((num, i) => 
                    <rect
                        key={i} 
                        x={marX + 2}
                        y={gap * i + marY}
                        width={num / (biggestNum(data) / chartX)}    
                        height={barSize} 
                        fill={color || colorGenerator()}
                    />)
                }
                    <line 
                        x1={marX - 2} 
                        x2={chartX + 2 + marX}
                        y1={data.length * gap + marY}
                        y2={data.length * gap + marY}
                        stroke="black"
                        strokeWidth="4" 
                    />
                    {scaleXAxis(scale, data)};
                </svg>
            </div>
        </div>
    );
};
