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
    x?: number;
    y?: number;
    text: string;
}
export interface PlotLines {
    color?: string;
    dashStyle: string;
    width: number;
    value: number;
    label: Label;
}
export interface XAxis {
    gridLineWidth: number;
    title: Title;
    unitName: string;
    plotLines: PlotLines[];
}

export interface YAxis {
    gridLineWidth: number;
    title: Title;
    unitName: string;
    plotLines: PlotLines[];
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
export const BubbleChart = ({title, subtitle, xAxis, yAxis, width, height, series}: BubbleChartData) => (
    <svg width={width} height={height}>
        <text>Coming Soon(BubbleChart)</text>
    </svg>
);
