import * as React from 'react';
import './BubbleChart.scss';

export interface Title {
    text: string;
}
export interface Subtitle {
    text: string;
}
export interface Label {
    rotation: number;
    text: string;
    x: number;
    y: number;
}
export interface PlotLines {
    color: string;
    dashStyle: string;
    label: Label;
    value: number;
    width: number;
}
export interface XAxis {
    gridLineWidth: number;
    plotLines: PlotLines;
    title: Title;
    unitName: string;
}

export interface YAxis {
    gridLineWidth: number;
    plotLines: PlotLines;
    title: Title;
    unitName: string;
}
export interface Data {
    x: number;
    y: number;
    z: number;
    shortName: string;
    fullName: string;
}
export interface BubbleChartData {
    title: Title;
    subtitle: Subtitle;
    xAxis: XAxis;
    yAxis: YAxis;
    width: number;
    height: number;
    series: Data[];
}

function Map(value: number, min1: number, max1: number, min2: number, max2: number) {
    // (v - min1) / (max1 - min 1) = (result - min2) / (max2 - min2)
    return min2 + (((max2 - min2) * (value - min1)) / (max1 - min1));
}

function BigX(series: Data[]) {
    let big = -Infinity;
    for (const s of series) {
        if (big < s.x) {
            big = s.x;
        }
    }
    return big;
}
function SmallX(series: Data[]) {
    let small = Infinity;
    for (const s of series) {
        if (small > s.x) {
            small = s.x;
        }
    }
    return small;
}
function BigY(series: Data[]) {
    let big = -Infinity;
    for (const s of series) {
        if (big < s.y) {
            big = s.y;
        }
    }
    return big;
}
function SmallY(series: Data[]) {
    let small = Infinity;
    for (const s of series) {
        if (small > s.y) {
            small = s.y;
        }
    }
    return small;
}
function BigZ(series: Data[]) {
    let big = -Infinity;
    for (const s of series) {
        if (big < s.z) {
            big = s.z;
        }
    }
    return big;
}
function SmallZ(series: Data[]) {
    let small = Infinity;
    for (const s of series) {
        if (small > s.z) {
            small = s.z;
        }
    }
    return small;
}

function DrawBackgroundLines(x1: number, y1: number, x2: number, y2: number, s: Data[]) {
    return;
}

function PutCircles(x1: number, y1: number, x2: number, y2: number, s: Data[]) {
    const bigX = BigX(s);
    const smallX = SmallX(s);
    const bigY = BigY(s);
    const smallY = SmallY(s);
    const bigZ = BigZ(s);
    const smallZ = SmallZ(s);

    return (
        s.map((d,index) => (
            <circle
                cx={Map(s[index].x, smallX, bigX, x1, x2)} 
                cy={Map(s[index].y, smallY, bigY, y2, y1)}
                r={Map(s[index].z, smallZ, bigZ, 5, 50)}
                stroke="black"
                fill="rgba(255,0,0,0.5)"
            />
        ))
    );
}

export const BubbleChart = ({title, subtitle, xAxis, yAxis, width, height, series}: BubbleChartData) => (
    <svg width={width} height={height}>
        <text>Coming Soon(BubbleChart)</text>
        <rect className="background" key="1" width={width} height={height} stroke="black" fill="white"/>
        <rect  key="2" x="50" y="50" width={width - 100} height={height - 100} stroke="black" fill="white"/>

        {DrawBackgroundLines(50, 50, width - 100, height - 100, series)}
        {/*PutYAxisInfos(width, height, series)*/}
        {/*PutXAxisInfos(width, height, series)*/}

        {/*DrawGridLines(series, width, height, plotOptions.pointStart)*/}

        <text className="chart-title" key="3" textAnchor="middle" x={width / 2} y="20">
            {title.text}
        </text>
        <text className="chart-subtitle" key="4" textAnchor="middle" x={width / 2} y="40">
            {subtitle.text}
        </text>
        <text // Y Name
            className="yAxis"
            key="5"
            textAnchor="middle" 
            x="30" 
            y={height / 2} 
            fill="gray" 
            transform={'rotate(-90 30,' + ( height / 2 ) + ' )'}
        >
            {yAxis.title.text}
        </text>
        <text // X Name
            className="yAxis"
            key="6"
            textAnchor="middle" 
            x="30" 
            y={height / 2} 
            fill="gray" 
            transform={'rotate(-90 30,' + ( height / 2 ) + ' )'}
        >
            {xAxis.title.text}
        </text>
        {PutCircles(50, 50, width - 50, height - 50, series)}
        {/*PutDataShortNames(width, height, series)*/}
        {/*PutDataFullNames(width, height, series)*/}
    </svg>
);