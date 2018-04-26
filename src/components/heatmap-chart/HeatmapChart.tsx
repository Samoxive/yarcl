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
    </svg>
);