import * as React from 'react';
import './AreaChart.scss';
import '../common.scss';
import { getColorGenerator } from '../../utils/colors';

export interface AreaChartProps {
    title?: string;
    subtitle?: string;
    series: Series[];
    scale?: number;
    scaleLabel?: string[];
}
export interface Series {
    label?: string;
    data: number[];
    color?: string;
}

const marX = 50;
const marY = 90;
const chartX = 300;
const chartY = 200;
const labelX = 5;
const labelY = 20;

function biggestNum(series: Series[]): number {
    let big = 0;
    for (let dataset of series) {
        if (Math.max(...(dataset.data)) > big) {
            big = Math.max(...(dataset.data));
        }
    }
    return big;
}

function biggestNumInArray(data: number[]): number {
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

function scaleYAxis(num: number | void, biggest: number) {
    let scale = num || 4;
    let texts = [];
    for (let i = 0; i <= scale; i++) {
        texts.push(
            <text
                className="chart-scale"
                key={i}
                x={labelX}
                y={(chartY * (scale - i) / scale) + marY + 4}
            >
            {numberPrefixed(i * biggest / (scale))}
            </text>);
    }
    return texts;
}

function scaleXAxis(num: number | void, biggest: number, scaleLabel?: string[]) {
    let scale = biggest - 1;
    let texts = [];
    for (let i = 0; i <= scale; i++) {
        texts.push(
            <text
                className="chart-scale"
                key={i}
                x={((chartX - 4) * (i) / scale) + marX}
                y={marY + chartY + labelY}
            >
            {scaleLabel || numberPrefixed(i)}
            </text>);
    }
    return texts;
}

function whereTheFirstPoint(data: number[]) {
    let i = biggestNumInArray(data);
    for (let j = 0; j < data.length; j++) {
        if (data[j] !== null && j < i) {
            i = j;
        }
    }
    return i;
}

function polygonPoints(data: number[], biggest: number, maxLength: number) {
    let i = 0;
    let pointString = marX + (whereTheFirstPoint(data) * (chartX / (maxLength - 1))) + ',' + (marY + chartY) + ' ';
    for (let datum of data) {
        if (datum !== null) {
            pointString += (marX + i) + ',' + (chartY - (datum * (chartY / biggest)) + marY) + ' ';
        }
        i += (chartX / (maxLength - 1));
    }
    i -= (chartX / (maxLength - 1));
    pointString +=  marX + i + ',' + (marY + chartY) + ' ';
    return pointString;
}

function maxLengthOfAllArrays(series: Series[]) {
    let maxLength = 0;
    for (let datum of series) {
        if (datum.data.length > maxLength) {
            maxLength = datum.data.length;
        }
    }
    return maxLength;
}

export const AreaChart = ({title, subtitle, series, scale, scaleLabel}: AreaChartProps) => {
    const colorGenerator = getColorGenerator();
    let seriesLen = series.length;
    let biggest = biggestNum(series);
    let maxLen = maxLengthOfAllArrays(series);
    let colors = series.map((datum) => datum.color ? datum.color : colorGenerator());
    return (
        <div className="area-chart">
            <svg viewBox={`0 0 ${chartX + marX + 100} ${chartY + marY + 50}`}>
                <rect width="100%" height="100%" fill="white"/>
                {/*Title*/}
                <text className="chart-title" y={20}>{title}</text>
                <text className="chart-subtitle" y={40}>{subtitle}</text>
                    {
                    scaleYAxis(scale, biggest)
                    }
                {/*Y axis*/}
                <line 
                    x1={marX - 2}
                    x2={marX - 2} 
                    y1={marY} 
                    y2={marY + chartY}
                    stroke="black"
                    strokeWidth="4" 
                />
                {/*Polygon*/}
                {series.map((num, i) =>
                        <polygon
                            key={i}
                            points={polygonPoints(series[i].data, biggest, maxLen)}
                            fill={series[i].color || colors[i]}
                            opacity={seriesLen === 1 ? 1 : 0.5}
                        />
                    )
                }
                {/*X axis*/}
                <line 
                    x1={marX - 4} 
                    x2={marX + chartX}
                    y1={marY + chartY}
                    y2={marY + chartY}
                    stroke="black"
                    strokeWidth="4" 
                />
                {/*Scale of X axis*/}
                    {
                        scaleXAxis(scale, maxLen, scaleLabel)
                    }
                {/*Legend*/}
                {series.map((num, i) =>
                        <circle
                            key={i}
                            cx={marX + chartX + 20}
                            cy={marY + i * 20}
                            r={5}
                            fill={series[i].color || colors[i]}
                            opacity={seriesLen === 1 ? 1 : 0.5}
                        />
                    )
                }
                {series.map((num, i) =>
                        <text
                            key={i}
                            x={marX + chartX + 30}
                            y={marY + 5 + i * 20}
                            // fill={series[i].color || colors[i]}
                            className="chart-label"
                        >
                        {series[i].label}
                        </text>
                    )
                }
            </svg>  
        </div>
    );
};
