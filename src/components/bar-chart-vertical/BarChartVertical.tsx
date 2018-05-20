import * as React from 'react';
import './BarChartVertical.scss';
import '../common.scss';
import { getColorGenerator } from '../../utils/colors';

export interface BarChartVerticalData {
    title?: string;
    subtitle?: string;
    label: string[];
    data: number[];
    color?: string;
    scale?: number;
}

const marX = 50; // margin X
const marY = 30;
const chartY = 250; // chart Y
const gap = 40; // gap size
const barSize = 35; // barSize SHOULD NOT BE bigger than gap.
const labelX = 0; // x axis label size
const labelY = 20; // y axis scale size

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

function scaleYAxis(num: number | void, data: number[]) {
    let scale = num || 4;
    let texts = [];
    for (let i = scale; i >= 0; i--) {
        texts.push(
            <text
                key={i}
                className="chart-scale"
                x={labelX} 
                y={marY + 5 + (chartY * i / scale)}
            >
            {numberPrefixed((scale - i) * biggestNum(data) / (scale))}
            </text>);
    }
    return texts;
}

export const BarChartVertical = ({title, subtitle, data, label, color, scale}: BarChartVerticalData) => {
    const colorGenerator = getColorGenerator();
    return (
        <div className="yarcl-chart bar-chart-vertical">
            {/*Title*/}
            <div className="chart-title">{
                title}
            </div>
            <div className="chart-subtitle">
                {subtitle}
            </div>
            
            <svg viewBox={`0 0 ${data.length * gap + 10 + marX} ${chartY + marY + 60}`} width="100%">
                <rect width="100%" height="100%" fill="white"/>
                {scaleYAxis(scale, data)}
                {data.map((num, i) => 
                    <rect
                        key={i} 
                        x={marX + gap * i}
                        y={(chartY - (num / (biggestNum(data) / chartY))) + marY}
                        width={barSize}    
                        height={(num / (biggestNum(data) / chartY))} 
                        fill={color || colorGenerator()}
                    />)
                }
                {data.map((num, i) =>
                    <text
                        key={i}
                        x={marX - 2 + i * gap}
                        y={(chartY - (num / (biggestNum(data) / chartY))) + marY - 2}
                        className="chart-label"
                    >
                        {numberPrefixed(data[i])}
                    </text>
                    )
                }
                    <line 
                        x1={marX} 
                        x2={marX}
                        y1={marY}
                        y2={chartY + marY}
                        stroke="black"
                        strokeWidth="4" 
                    />
                    <line 
                        x1={marX - 2}
                        x2={data.length * gap + marX - 5}
                        y1={chartY + marY}
                        y2={chartY + marY}
                        stroke="black"
                        strokeWidth="4" 
                    />
                {label.map((num, i) => 
                    <text 
                        key={i}
                        x={marX + gap * i} 
                        y={chartY + marY + labelY}
                        className="chart-label"
                        transform={
                            'rotate(-45 ' +
                            (marX + gap * i + 2 * labelY) +
                            ',' + 
                            (chartY + marY + labelY + 5) + 
                            ' )'
                        }
                    >
                        {num.length < marX * (9 / 50) ? num : num.substring(0, (marX * 7 / 50)) + '...'}
                    </text>
                )}
            </svg>
        </div>
    );
};
