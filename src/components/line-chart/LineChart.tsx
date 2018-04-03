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

function PlaceNames(w: number, h: number, d: Data[]) {
    return d.map((data, i) => (
        (i % 5 == 0) ? (
            <text  text-anchor="start" x={w - 150} y={(6 + i)*h/16 + 25} fill="blue">{data.name}</text>
        ):
        (i % 5 == 1) ? (
            <text  text-anchor="start" x={w - 150} y={(6 + i)*h/16 + 25} fill="black">{data.name}</text>
        ):
        (i % 5 == 2) ? (
            <text  text-anchor="start" x={w - 150} y={(6 + i)*h/16 + 25} fill="green">{data.name}</text>
        ):
        (i % 5 == 3) ? (
            <text  text-anchor="start" x={w - 150} y={(6 + i)*h/16 + 25} fill="orange">{data.name}</text>
        ):
        (i % 5 == 4) ? (
            <text  text-anchor="start" x={w - 150} y={(6 + i)*h/16 + 25} fill="purple">{data.name}</text>
        ):
        null
    ));
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

function XAxisLines(s: Data[], w: number, h: number, p: number) {
    let c = MaxDataCount(s);
    let arr = new Array(c);
    for (let i = 0; i < c; i++) {
        arr[i] = i;
    }
    return arr.map((num) => (
        <line 
            x1={105 + num * (w - 300) / (c - 1)} 
            y1={6*h/8}
            x2={105 + num * (w - 300) / (c - 1)}
            y2={6*h/8 + 10}
            stroke-width="1"
            opacity="0.8"
            stroke="gray"/>
    ));
}
    
function XAxisDatas(s: Data[], w: number, h: number, p: number) {
    let c = MaxDataCount(s);
    let arr = new Array(c);
    for (let i = 0; i < c; i++) {
        arr[i] = i;
    }
    return arr.map((num) => (
            <text text-anchor="middle" x={105 + num * (w - 300) / (c - 1)} y={6*h/8 + 25} fill="gray" >
                {(p + num)}
            </text>
    ));
}

function Triangle (w: number,h: number,i: number, j: number ,d: Data[]) {
    let c = MaxDataCount(d);
    let x1, x2, x3, y1, y2, y3, x, y;
    let b = BigOne(d);
    x = 105+j*(w-300)/(c-1);
    y = (3*h/4 - ((d[i].data[j] * 1) / b) * (h/2));
    x1 = x;
    y1 = y - 9;

    x2 = x - 6;
    y2 = y + 3;

    x3 = x + 6;
    y3 = y + 3;
    return <polygon points={""+x1+","+y1+" "+x2+","+y2+" "+x3+","+y3+""} fill="green"/>
}

function Star(w: number,h: number,i: number, j: number ,d: Data[]) {
    let c = MaxDataCount(d);
    let b = BigOne(d);
    let x1, x2, x3, x4, x5, y1, y2, y3, y4, y5, x, y;
    x = 105+j*(w-300)/(c-1);
    y = (3*h/4 - ((d[i].data[j] * 1) / b) * (h/2));
    x1 = x;
    y1 = y - 8;

    x2 = x + 4;
    y2 = y + 3;

    x3 = x - 6;
    y3 = y - 3;

    x4 = x + 6;
    y4 = y - 3;

    x5 = x - 4;
    y5 = y + 3;
    return <polygon points={""+x1+","+y1+" "+x2+","+y2+" "+x3+","+y3+" "+x4+","+y4+" "+x5+","+y5+""} fill="orange"/>
}

function Pentagon(w: number,h: number,i: number, j: number ,d: Data[]) {
    let c = MaxDataCount(d);
    let b = BigOne(d);
    let x1, x2, x3, x4, x5, y1, y2, y3, y4, y5, x, y;
    x = 105+j*(w-300)/(c-1);
    y = (3*h/4 - ((d[i].data[j] * 1) / b) * (h/2));
    x1 = x;
    y1 = y - 8;

    x2 = x + 6;
    y2 = y - 3;

    x3 = x + 4;
    y3 = y + 3;

    x4 = x - 4;
    y4 = y + 3;

    x5 = x - 6;
    y5 = y - 3;
    return <polygon points={""+x1+","+y1+" "+x2+","+y2+" "+x3+","+y3+" "+x4+","+y4+" "+x5+","+y5+""} fill="purple"/>
}

function DrawHorizontalLines(w: number, h: number) {
    let arr = [ 1, 2, 3, 4, 5];
    return arr.map((num, i) => (
        <line 
        x1={100} 
        y1={(i + 2) * h / 8} 
        x2={w - 190} 
        y2={(i + 2) * h / 8} 
        stroke-width="1" 
        opacity="0.7"
        stroke="gray"/>
    ));
}

function XAxisInfos(w: number, h: number, d: Data[]) {
    let arr = [ 1, 2, 3, 4, 5];
    return arr.map((num, i) => (
        <text text-anchor="end" x={100 - 5} y={(i + 2) * h / 8 + 5} fill="gray" >{(4 - i)*BigOne(d)/4}</text>
    ));
}

function DrawDataLines(w: number, h: number, d: Data[]) {
    let c = MaxDataCount(d);
    let b = BigOne(d);
    return d.map((num, i) => (
        d[i].data.map((num, j) => (
            (j == d[i].data.length - 1)? null:(
                (i%5 === 0)? (
                    <line 
                    x1={105+j*(w-300)/(c-1)} 
                    y1={(3*h/4-((d[i].data[j]*1)/b)*(h/2))}
                    x2={105+(j+1)*(w-300)/(c-1)} 
                    y2={(3*h/4-((d[i].data[j+1]*1)/b)*(h/2))}
                    stroke-width="1"
                    stroke="blue"/>
                ):
                (i%5 === 1)? (
                    <line 
                    x1={105+j*(w-300)/(c-1)} 
                    y1={(3*h/4-((d[i].data[j]*1)/b)*(h/2))}
                    x2={105+(j+1)*(w-300)/(c-1)} 
                    y2={(3*h/4-((d[i].data[j+1]*1)/b)*(h/2))}
                    stroke-width="1"
                    stroke="black"/>
                    ):
                (i%5 === 2)? (
                    <line 
                    x1={105+j*(w-300)/(c-1)} 
                    y1={(3*h/4-((d[i].data[j]*1)/b)*(h/2))}
                    x2={105+(j+1)*(w-300)/(c-1)} 
                    y2={(3*h/4-((d[i].data[j+1]*1)/b)*(h/2))}
                    stroke-width="1"
                    stroke="green"/>
                    ):
                (i%5 === 3)? (
                    <line 
                    x1={105+j*(w-300)/(c-1)} 
                    y1={(3*h/4-((d[i].data[j]*1)/b)*(h/2))}
                    x2={105+(j+1)*(w-300)/(c-1)} 
                    y2={(3*h/4-((d[i].data[j+1]*1)/b)*(h/2))}
                    stroke-width="1"
                    stroke="orange"/>
                    ):
                (i%5 === 4)? (
                    <line 
                    x1={105+j*(w-300)/(c-1)} 
                    y1={(3*h/4-((d[i].data[j]*1)/b)*(h/2))}
                    x2={105+(j+1)*(w-300)/(c-1)} 
                    y2={(3*h/4-((d[i].data[j+1]*1)/b)*(h/2))}
                    stroke-width="1"
                    stroke="purple"/>
                    ): null 
            ) 
        ))
    ));
}

function DrawPoint(w: number, h: number, d: Data[]) {
    let c = MaxDataCount(d);
    let b = BigOne(d);
    return d.map((num, i) => (
        d[i].data.map((num, j) => (
            (i%5 === 0)? <circle  cx={105+j*(w-300)/(c-1)} cy={(3*h/4 - ((d[i].data[j] * 1) / b) * (h/2))} r={5} fill="blue"/>:             // Circle
            (i%5 === 1)? <rect x={105+j*(w-300)/(c-1)-5} y={(3*h/4-((d[i].data[j]*1)/b)*(h/2))-5} width={10} height={10} fill="black"/>:    // Rectangle
            (i%5 === 2)? Triangle(w, h, i, j, d) :                                                                                          // Triangle
            (i%5 === 3)? Star(w,h,i,j,d):                                                                                                   // Star
            (i%5 === 4)? Pentagon(w,h,i,j,d): null                                                                                          // Pentagon
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

        {/*<line x1={105} y1={6*h/8} x2={105} y2={6*h/8 + 10} stroke-width="1" stroke="gray"/>}
        {  <text text-anchor="middle" x={100 + 5} y={6*h/8 + 25} fill="gray" >{p.pointStart}</text>*/}
        {XAxisDatas(d,w,h,p.pointStart)}
        {XAxisLines(d,w,h,p.pointStart)}

        <text text-anchor="middle" x={w/2} y="30" fill="gray" >{t.text}</text>
        <text text-anchor="middle" x={w/2} y="60" fill="gray" >{s.text}</text>
        <text text-anchor="middle" x="30" y={h/2} fill="gray" transform={"rotate(-90 30,"+(h/2)+" )"}>{y.title.text}</text>
        {DrawDataLines(w,h,d)}
        {DrawPoint(w,h,d)}
        {PlaceNames(w,h,d)}
    </svg>
);
