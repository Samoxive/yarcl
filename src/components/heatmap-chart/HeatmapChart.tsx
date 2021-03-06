import * as React from 'react';

export interface Title {
    text: string;
}

export interface XAxis {
    categories: string[];
}

export interface YAxis {
    categories: string[];
}

export interface DataLabel {
    enabled: boolean;
    colorCode: string;
}

export interface Series {
    borderWidth: number;
    data: number[][];
    dataLabels: DataLabel;
}

export interface HeatmapChartData {
    title: Title;
    xAxis: XAxis;
    yAxis: YAxis;
    width: number;
    height: number;
    series: Series;
    colorCode: string;
}

function Map(value: number, min1: number, max1: number, min2: number, max2: number) {
    // (v - min1) / (max1 - min 1) = (result - min2) / (max2 - min2)
    return min2 + (((max2 - min2) * (value - min1)) / (max1 - min1));
}

function Big(series: Series) {
    let big = -Infinity;
    for (const s of series.data) {
        if (big < s[2]) {
            big = s[2];
        }
    }
    return big;
}
function Small(series: Series) {
    let small = Infinity;
    for (const s of series.data) {
        if (small > s[2]) {
            small = s[2];
        }
    }
    return small;
}

function PlaceDataCells(xl: number, yl: number, w: number, h: number, s: Series) {
    return ( s.data.map((i, index) => (
        <>
            <rect
                key={index}
                x={100 + i[0] * ((w - 250) / xl)}
                y={50 + i[1] * ((h - 150) / yl)}
                width={((w - 250) / xl)}
                height={((h - 150) / yl)}
                strokeWidth={s.borderWidth}
                stroke="white"
                fill={
                    'rgb(' +
                    (255 - Map(i[2], Small(s), Big(s), 0, 255)) +
                    ',' +
                    (255 - Map(i[2], Small(s), Big(s), 0, 255)) +
                    ',255)'
                }
            />
            {(s.dataLabels.enabled) ? (
                <text
                    key={index + s.data.length}
                    className="chart-label"
                    textAnchor="middle"
                    x={100 + i[0] * ((w - 250) / xl) + ((w - 250) / (2 * xl))}
                    y={50 + i[1] * ((h - 150) / yl) + ((h - 150) / (2 * yl))}
                    fill={Map(i[2], Small(s), Big(s), 0, 255) > 190 ? 'white' : 'black'}
                >
                    {i[2]}
                </text>
            ) : null}
            
        </>
    )));
}

function PlaceYAxisInfos(ya: YAxis, xo: number, yo: number, h: number) {
    return (ya.categories.map((i, index) => (
        <text
            key={index}
            x={xo - 10}
            y={Map(index , 0, ya.categories.length , yo, h - 100) + ((h - 150) / (ya.categories.length * 2))}
            textAnchor="end"
            fill="black"
        >
            {i}
        </text>
    )));
}

function PlaceXAxisInfos(xa: XAxis, xo: number, yo: number, w: number, h: number) {
    return (xa.categories.map((i, index) => (
        <text
            key={index}
            x={Map(index, 0, xa.categories.length, xo, w - 150) + ((w - 250) / (xa.categories.length * 2))}
            y={yo + 10}
            textAnchor="end"
            fill="black"
            transform={
                'rotate(-45 ' +
                (Map(index, 0, xa.categories.length, xo, w - 150) + ((w - 250) / (xa.categories.length * 2))) +
                ',' + 
                (yo + 10) + 
                ' )'
            }
        >
            {i}
        </text>
    )));
}

function PlaceColorBar(xo: number, yo: number, h: number) {
    return(
        <>
            <defs>
                <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgb(255,255,255)" stopOpacity={1} />
                    <stop offset="100%" stopColor="rgb(0,0,255)" stopOpacity={1} />
                </linearGradient>
            </defs>
            <rect 
                x={xo} 
                y={yo} 
                width="30" 
                height={h - 150} 
                fill="url(#grad2)" 
                strokeWidth="1"
                stroke="rgb(100,100,200)"
            />
        </>
    );
}

function PlaceBarInfos(xo: number, yo: number, h: number, s: Series) {
    const a = [0, 1, 2, 3, 4, 5, 6];
    return(a.map((i, index) => (
        <>
            <text
                key={index}
                x={xo + 40}
                y={yo + i * (h - yo * 2) / a.length}
                textAnchor="start"
                fill="black"
            >
                {Math.floor(Map(i, a[0], a[a.length - 1], Small(s), Big(s)))}
            </text>
            <line
                key={index + a.length}
                x1={xo}
                y1={yo + i * (h - yo * 2) / a.length}
                x2={xo + 30}
                y2={yo + i * (h - yo * 2) / a.length}
                strokeWidth={2}
                stroke="rgb(235,235,255)"
            />
        </>
    )));
}

export const HeatmapChart = ({title, xAxis, yAxis, width, height, series}: HeatmapChartData) => (
    <svg width={width} height={height}>
        <rect  
            key="1" 
            width={width} 
            height={height}
            fill="white"
        />
        <text className="chart-title" key="2" textAnchor="middle" x={width / 2} y="30">
             {title.text}
         </text>
        {PlaceDataCells(xAxis.categories.length, yAxis.categories.length, width, height, series)}
        {PlaceYAxisInfos(yAxis, 100, 50, height)}
        {PlaceXAxisInfos(xAxis, 100, height - 100, width, height)}
        {PlaceColorBar(width - 120, 50, height)}
        {PlaceBarInfos(width - 120, 50, height, series)}

    </svg>
);