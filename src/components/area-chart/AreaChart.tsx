import * as React from 'react';
import './AreaChart.scss';
import '../common.scss';
import { getColorGenerator } from '../../utils/colors';

export interface AreaChartProps {
    title?: string;
    subtitle?: string;
    series: Series[];
    color?: string;
    scale?: number;
}
export interface Series {
    label?: string;
    data: number[];
}

const marX = 50;
const marY = 90;
const chartX = 200;
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

function scaleXAxis(num: number | void, biggest: number) {
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
            {numberPrefixed(i)}
            </text>);
    }
    return texts;
}

function polygonPoints(data: number[], biggest: number, maxLength: number) {
    let i = 0;
    // TODO: add non 0 start with nulls, hint: get first non null's i and start i,0
    let pointString = marX + ',' + (marY + chartY) + ' ';
    for (let datum of data) {
        pointString += (marX + i) + ',' + (chartY - (datum * (chartY / biggest)) + marY) + ' ';
        i += (chartX / (maxLength - 1));
    }
    i -= (chartX / (maxLength - 1));
    pointString +=  marX + i + ',' + (marY + chartY) + ' ';
    return pointString;
}

function maxArray(series: Series[]) {
    let maxLength = 0;
    for (let datum of series) {
        if (datum.data.length > maxLength) {
            maxLength = datum.data.length;
        }
    }
    return maxLength;
}

export const AreaChart = ({title, subtitle, series, color, scale}: AreaChartProps) => {
    const colorGenerator = getColorGenerator();
    let seriesLen = series.length;
    let biggest = biggestNum(series);
    let maxLen = maxArray(series);
    return (
        <div className="area-chart">
            <div className="chart-data">
                <svg viewBox={`0 0 ${chartX + marX + 50} ${chartY + marY + 50}`} width="100%" >
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
                                fill={color || colorGenerator()}
                                opacity={seriesLen === 1 ? 1 : 0.5}
                            />
                        )
                    }
                    {/*TODO: Legend based on colors*/}
                    {/*X axis*/}
                    <line 
                        x1={marX - 4} 
                        x2={marX + chartX}
                        y1={marY + chartY}
                        y2={marY + chartY}
                        stroke="black"
                        strokeWidth="4" 
                    />
                    {
                        scaleXAxis(scale, maxLen)
                    }
                </svg>
            </div>    
        </div>
    );
};