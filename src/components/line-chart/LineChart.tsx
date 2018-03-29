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
function Triangle (w: number,h: number,i: number, j: number ,d: Data[]) {
    let c = MaxDataCount(d);
    let x1, x2, x3, y1, y2, y3, x, y;
    x = 105+j*(w-200)/(c-1);
    y = (3*h/4 - ((d[i].data[j] * 1) / c) * (h/2));
    x1 = x;
    y1 = y - 9;

    x2 = x - 6;
    y2 = y + 3;

    x3 = x + 6;
    y3 = y + 3;
    return <polygon points={""+x1+","+y1+" "+x2+","+y2+" "+x3+","+y3+""} fill="green"/>
}

function DrawHorizontalLines(w: number, h: number) {
    let arr = [ 1, 2, 3, 4, 5];
    return arr.map((num, i) => (
        <line x1={100} y1={(i + 2) * h / 8} x2={w - 90} y2={(i + 2) * h / 8} stroke-width="1" stroke="gray"/>
    ));
}

function XAxisInfos(w: number, h: number, d: Data[]) {
    let arr = [ 1, 2, 3, 4, 5];
    return arr.map((num, i) => (
        <text text-anchor="end" x={100 - 5} y={(i + 2) * h / 8 + 5} fill="gray" >{(4 - i)*BigOne(d)/4}</text>
    ));
}

// Not finished
function DrawPoint(w: number, h: number, d: Data[]) {
    let c = MaxDataCount(d);
    return d.map((num, i) => (
        d[i].data.map((num, j) => (
            (i%5 === 0)? <circle  cx={105+j*(w-200)/(c-1)} cy={(3*h/4 - ((d[i].data[j] * 1) / c) * (h/2))} r={5} fill="blue"/>:           // Circle-DONE
            (i%5 === 1)? <rect x={105+j*(w-200)/(c-1)-4} y={(3*h/4-((d[i].data[j]*1)/c)*(h/2))-4} width={8} height={8} fill="black"/>:    // Rectangle-DONE
            (i%5 === 2)? Triangle(w, h, i, j, d) :                                                                                        // Triangle-DONE
            (i%5 === 3)? <polygon points={""+100+","+10+" "+40+","+198+" "+190+","+78+" "+10+","+78+" "+160+","+198+""} fill="orange"/>:  // Star
            (i%5 === 4)? <polygon points={"100,10 10,78 40,198 160,198 190,78"} fill="purple"/>: null                                     // Pentagon I guess
        ))
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

        {DrawHorizontalLines(w,h)}
        {XAxisInfos(w,h,d)}

        <text text-anchor="middle" x={100 + 5} y={6*h/8 + 25} fill="gray" >{p.pointStart}</text>
        {XAxis(d,w,h,p.pointStart)}

        <text text-anchor="middle" x={w/2} y="30" fill="gray" >{t.text}</text>
        <text text-anchor="middle" x={w/2} y="60" fill="gray" >{s.text}</text>
        <text text-anchor="middle" x="30" y={h/2} fill="gray" transform={"rotate(-90 30,"+(h/2)+" )"}>{y.title.text}</text>

        {DrawPoint(w,h,d)}
    </svg>
);
