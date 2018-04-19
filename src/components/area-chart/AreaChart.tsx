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

const marX = 30;
const marY = 10;
const chartX = 200;
const chartY = 200;

function getRandomColor(): string {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function biggestNum(series: Series[]): number {
    let big = 0;
    for (let dataset of series) {
        if (Math.max(...(dataset.data)) > big) {
            big = Math.max(...(dataset.data));
        }
    }
    return big;
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

function scaleYAxis(num: number | void, biggest: number) {
    let scale = num || 4;
    let texts = [];
    for (let i = 0; i <= scale; i++) {
        texts.push(
            <text
                key={i}
                x={5}
                y={(200 * (scale - i) / scale) + marY + 4}  
                fontSize={5}
            >
            {numberPrefixed(i * biggest / (scale))}
            </text>);
    }
    return texts;
}

function polygonPoints(data: number[], biggest: number) {
    let pointString = marX + ',' + (marY + 200) + ' ';
    let i = 0;
    for (let datum of data) {
        pointString += (marX + i) + ',' + (200 - (datum * (200 / biggest)) + marY) + ' ';
        i += (200 / (data.length - 1));
    }
    i -= (200 / (data.length - 1));
    pointString +=  marX + i + ',' + (marY + 200) + ' ';
    return pointString;
}
export const AreaChart = ({title, subtitle, series, color, scale}: AreaChartProps) => {
    const colorGenerator = getColorGenerator();
    let seriesLen = series.length;
    let biggest = biggestNum(series);
    return (
        <div className="area-chart">
            <div className="chart-data">
                <svg viewBox={`0 0 275 250`} >
                    {
                        scaleYAxis(scale, biggest)
                    }
                    {/*Y axis*/}
                    <line 
                        x1={marX - 2}
                        x2={marX - 2} 
                        y1={marY} 
                        y2={marY + 200}
                        stroke="black"
                        strokeWidth="4" 
                    />
                    {/*Polygon*/}
                    {/*<polygon points="0,100 50,25 50,75 100,0" />*/}
                    {series.map((num, i) =>
                            <polygon
                                key={i}
                                points={polygonPoints(series[i].data, biggest)}
                                fill={colorGenerator()}
                                opacity={seriesLen === 1 ? 1 : 0.5}
                            />
                        )
                    }
                    {/*X axis*/}
                    <line 
                        x1={marX - 4} 
                        x2={marX + 200}
                        y1={marY + 200}
                        y2={marY + 200}
                        stroke="black"
                        strokeWidth="4" 
                    />

                </svg>
            </div>
        </div>
    );
};
