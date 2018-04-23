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

function DrawBackgroundLines(x1: number, y1: number, x2: number, y2: number) {
    const a = [1, 2, 3];
    const b = [1, 2, 3, 4];
    return(
        <>
            {a.map((i) =>
                <line 
                    key={i}
                    x1={x1}
                    y1={i * (y2 - y1) / (a.length + 1) + y1}
                    x2={x2}
                    y2={i * (y2 - y1) / (a.length + 1) + y1}
                    stroke-width="1"
                    stroke="gray"
                    opacity="0.8"
                />
            )}
            {b.map((i) =>
                <line 
                    key={10 + i}
                    x1={i * (x2 - x1) / (b.length + 1) + x1}
                    y1={y1}
                    x2={i * (x2 - x1) / (b.length + 1) + x1}
                    y2={y2}
                    stroke-width="1"
                    stroke="gray"
                    opacity="0.8"
                />
            )}
        </>
    );
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
                stroke="rgba(255,0,0,0.8)"
                fill="rgba(255,0,0,0.5)"
            />
        ))
    );
}

function PutYAxisInfos(x: number, y1: number, y2: number,yAxis: YAxis, s: Data[]) {
    const bigY = BigY(s);
    const smallY = SmallY(s);
    const a = [1, 2, 3];
    return (
        a.map((i) =>
            <text
                key={i}
                x={x - 50}
                y={(a.length + 1 - i) * (y2 - y1) / (a.length + 1) + y1}
                stroke-width="1"
                stroke="gray"
            >
            { "" + Math.floor(i * (bigY - smallY) / (a.length + 1) + smallY) + " " + yAxis.unitName}
            </text>
        )
    );
}

function PutXAxisInfos(x1: number, x2: number, y: number, xAxis: XAxis, s: Data[]) {
    const bigX = BigX(s);
    const smallX = SmallX(s);
    const b = [1, 2, 3, 4];
    return (
        b.map((i) =>
            <text
                key={i}
                text-anchor="middle"
                x={i * (x2 - x1) / (b.length + 1) + x1}
                y={y + 15}
                stroke-width="1"
                stroke="gray"
            >
            { "" + Math.floor(i * (bigX - smallX) / (b.length + 1) + smallX) + " " + xAxis.unitName}
            </text>
        )
    );
}

function DrawGridLines(x1: number, y1: number, x2: number, y2: number, xAxis: XAxis, yAxis: YAxis,s: Data[]) {
    const bigX = BigX(s);
    const smallX = SmallX(s);
    const bigY = BigY(s);
    const smallY = SmallY(s);
    return(
        <>
            <line 
                x1={x1}
                x2={x2}
                y1={Map(xAxis.plotLines.value, smallY, bigY, y2, y1)}
                y2={Map(xAxis.plotLines.value, smallY, bigY, y2, y1)}
                stroke-width={1}
                stroke-dasharray="4, 4"
                stroke="black"
            />
            <text
                text-anchor="end"
                x={x2 - 10} 
                y={Map(xAxis.plotLines.value, smallY, bigY, y2, y1)-10} 
                fill="black" 
            >
            {
                (xAxis.plotLines.value < bigY && xAxis.plotLines.value > smallY) ?
                xAxis.plotLines.label.text + xAxis.plotLines.value + xAxis.unitName +"/day"  : null
            }
            </text>
            <line 
                x1={Map(yAxis.plotLines.value, smallX, bigX, x1, x2)}
                x2={Map(yAxis.plotLines.value, smallX, bigX, x1, x2)}
                y1={y1}
                y2={y2}
                stroke-width={1}
                stroke-dasharray="4, 4"
                stroke="black"
            />
            <text
                x={Map(yAxis.plotLines.value, smallX, bigX, x1, x2) + 10} 
                y={y1 + 20} 
                fill="black" 
            >
            {
                (yAxis.plotLines.value < bigX && yAxis.plotLines.value > smallX) ?
                yAxis.plotLines.label.text + yAxis.plotLines.value + yAxis.unitName +"/day"  : null
            }
            </text>
        </>
    );
}

export const BubbleChart = ({title, subtitle, xAxis, yAxis, width, height, series}: BubbleChartData) => (
    <svg width={width} height={height}>
        <text>Coming Soon(BubbleChart)</text>
        <rect className="background" key="1" width={width} height={height} stroke="black" fill="white"/>
        <rect  key="2" x="100" y="50" width={width - 150} height={height - 100} stroke="black" fill="white"/>

        {DrawBackgroundLines(100, 50, width - 50, height - 50)}
        {PutCircles(100, 50, width - 50, height - 50, series)}
        {PutYAxisInfos(100, 50, height - 50, yAxis, series)}
        {PutXAxisInfos(100, width - 50, height - 50, xAxis, series)}

        {DrawGridLines(100, 50, width - 50, height - 50, xAxis, yAxis, series)}

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
            x={width /2} 
            y={height - 10} 
            fill="gray" 
        >
            {xAxis.title.text}
        </text>
        {/*PutDataShortNames(width, height, series)*/}
        {/*PutDataFullNames(width, height, series)*/}
    </svg>
);