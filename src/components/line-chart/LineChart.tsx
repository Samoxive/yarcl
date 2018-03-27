import * as React from 'react';

export interface Title {
    text: string;
}

export interface PlotOptions {
    pointStart: number;
}

export interface yAxis {
    title: Title;
}

export interface Subtitle {
    text: string;
}

export interface Data {
    name: string;
    data: number[];
}

export interface LineChartData {
    t: Title;
    s: Subtitle;
    y: yAxis;
    p: PlotOptions;
    w: number;
    h: number;
    d: Data[];
}

export const LineChart = ({t,s,y,p,w,h,d}: LineChartData) => (
    <svg width={w} height={h}>
        <text text-anchor="middle" x={w/2} y="15" fill="gray" >{t.text}</text>

    </svg>
);
