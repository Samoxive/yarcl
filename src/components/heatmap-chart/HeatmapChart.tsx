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
    name: string;
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
                x={50 + i[0] * ((w - 100) / xl)}
                y={50 + i[1] * ((h - 100) / yl)}
                width={((w - 100) / xl)}
                height={((h - 100) / yl)}
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
                    textAnchor="middle"
                    x={50 + i[0] * ((w - 100) / xl) + ((w - 100) / (2 * xl))}
                    y={50 + i[1] * ((h - 100) / yl) + ((h - 100) / (2 * yl))}
                    fill={s.dataLabels.colorCode}
                >
                    {i[2]}
                </text>
            ) : null}
            
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

    </svg>
);