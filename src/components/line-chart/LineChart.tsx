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

function BigOne(series: Data[]) {
    let big = 0;
    for (let i = 0; i < series.length; i++) {
        for (let j = 0; j < series[i].data.length; j++) {
            if(big < series[i].data[j]) {
                big = series[i].data[j];
            }
        }
    }
    return big;
}

function MaxDataCount(series: Data[]) {
    let maxCount = 0;
    for (let i = 0; i < series.length; i++) {
        if (maxCount < series[i].data.length) {
            maxCount = series[i].data.length;
        }
    }
    return maxCount;
}

function XAxis(s: Data[], w: number, h: number, p: number) {
    let c = MaxDataCount(s);
    let arr = new Array(c);
    for (let i = 0; i < c; i++) {
        arr[i] = i + 1;
    }
    return arr.map((num) => (
        <text text-anchor="middle" x={105 + num * (w - 200) / (c - 1)} y={6*h/8 + 25} fill="gray" >
            {(p + num)}
        </text>
    ));
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
        <rect width={w} height={h} stroke-width="2" stroke="green" fill="white" />

        <line x1={100} y1={2*h/8} x2={w-100} y2={2*h/8} stroke-width="1" stroke="gray"/>
        <text text-anchor="end" x={100 - 5} y={2*h/8 + 5} fill="gray" >{4*BigOne(d)/4}</text>

        <line x1={100} y1={3*h/8} x2={w-100} y2={3*h/8} stroke-width="1" stroke="gray"/>
        <text text-anchor="end" x={100 - 5} y={3*h/8 + 5} fill="gray" >{3*BigOne(d)/4}</text>

        <line x1={100} y1={4*h/8} x2={w-100} y2={4*h/8} stroke-width="1" stroke="gray"/>
        <text text-anchor="end" x={100 - 5} y={4*h/8 + 5} fill="gray" >{2*BigOne(d)/4}</text>

        <line x1={100} y1={5*h/8} x2={w-100} y2={5*h/8} stroke-width="1" stroke="gray"/>
        <text text-anchor="end" x={100 - 5} y={5*h/8 + 5} fill="gray" >{1*BigOne(d)/4}</text>

        <line x1={100} y1={6*h/8} x2={w-100} y2={6*h/8} stroke-width="1" stroke="gray"/>
        <text text-anchor="end" x={100 - 5} y={6*h/8 + 5} fill="gray" >{0}</text>

        <text text-anchor="middle" x={100 + 5} y={6*h/8 + 25} fill="gray" >{p.pointStart}</text>
        {XAxis(d,w,h,p.pointStart)}

        <text text-anchor="middle" x={w/2} y="30" fill="gray" >{t.text}</text>
        <text text-anchor="middle" x={w/2} y="60" fill="gray" >{s.text}</text>
        <text text-anchor="middle" x="30" y={h/2} fill="gray" transform={"rotate(-90 30,"+(h/2)+" )"}>{y.title.text}</text>
    </svg>
);
