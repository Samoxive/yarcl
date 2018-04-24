import * as React from 'react';
import './LineChart.scss';
import '../common.scss';
import { getColorGenerator } from '../../utils/colors';

function bigOne(series: Data[]) {
    let big = 0;
    for (const d of series) {
        for (const n of d.data) {
            if (big < n) {
                big = n;
            }
        }
    }
    return big;
}

function placeNames(w: number, h: number, d: Data[]) {
    let colorGenerator = getColorGenerator();
    let colors = d.map((datum) =>  colorGenerator());
    return d.map((data, i) => (
            <>
                <text 
                    key={10 + i} 
                    className={'chart-label'}
                    textAnchor="start" 
                    x={w - 140} 
                    y={(6 + i) * h / 16 + 25}
                    fill="black" 
                >
                    {data.name}
                </text>
                <line
                    className={'dataBlock' + (i % 5 + 1)} 
                    key={20 + i}
                    x1={w - 180}
                    y1={(6 + i) * h / 16 + 25}
                    x2={w - 150} 
                    y2={(6 + i) * h / 16 + 25}
                    stroke={colors[i]} 
                />
                {
                    (i % 5 === 0) ? (
                        <circle  
                            className="dataBlock1"
                            key={i}
                            cx={w - 165} 
                            cy={(6 + i) * h / 16 + 25}  
                            r={5}
                            fill={colors[i]}  
                        />) :
                    (i % 5 === 1) ? (
                        <rect 
                            className="dataBlock2"
                            key={i}
                            x={w - 170} 
                            y={(6 + i) * h / 16 + 20} 
                            width={10} 
                            height={10} 
                            fill={colors[i]} 
                        />) :
                    (i % 5 === 2) ? (
                        <polygon 
                            className="dataBlock3"
                            key={i}
                            points={
                                ' ' + (w - 165) + ',' + ((6 + i) * h / 16 + 16) + 
                                ' ' + (w - 171) + ',' + ((6 + i) * h / 16 + 28) + 
                                ' ' + (w - 159) + ',' + ((6 + i) * h / 16 + 28) 
                            } 
                            fill={colors[i]} 
                        />) :
                    (i % 5 === 3) ? (
                        <polygon 
                            key={i}
                            className="dataBlock4"
                            points={
                            ' ' + (w - 165) + ',' + ((6 + i) * h / 16 + 17) + 
                            ' ' + (w - 161) + ',' + ((6 + i) * h / 16 + 28) + 
                            ' ' + (w - 171) + ',' + ((6 + i) * h / 16 + 22) + 
                            ' ' + (w - 159) + ',' + ((6 + i) * h / 16 + 22) + 
                            ' ' + (w - 169) + ',' + ((6 + i) * h / 16 + 28) 
                            } 
                            fill={colors[i]} 
                        />) :
                    (i % 5 === 4) ? (
                        <polygon 
                            className="dataBlock5"
                            key={i}
                            points={
                            ' ' + (w - 165) + ',' + ((6 + i) * h / 16 + 17) + 
                            ' ' + (w - 159) + ',' + ((6 + i) * h / 16 + 22) + 
                            ' ' + (w - 161) + ',' + ((6 + i) * h / 16 + 28) + 
                            ' ' + (w - 169) + ',' + ((6 + i) * h / 16 + 28) +
                            ' ' + (w - 171) + ',' + ((6 + i) * h / 16 + 22) 
                            } 
                            fill={colors[i]} 
                        />) :
                    null
                }
            </>
            ));
}

function getMaxDataCount(series: Data[]) {
    let maxCount = 0;
    for (const d of series) {
        if (maxCount < d.data.length) {
            maxCount = d.data.length;
        }
    }
    return maxCount;
}
    
function xAxisDatas(s: Data[], w: number, h: number, p: number) {
    const c = getMaxDataCount(s);
    const arr = new Array(c);
    for (let i = 0; i < c; i++) {
        arr[i] = i;
    }
    return arr.map((num, i) => (
        <>
            <line 
                className="xAxisInfos"
                key={10 + i}
                x1={105 + num * (w - 300) / (c - 1)} 
                y1={6 * h / 8}
                x2={105 + num * (w - 300) / (c - 1)}
                y2={6 * h / 8 + 10}
                stroke="black"
            />
            <text 
                className="chart-label" 
                key={i} 
                textAnchor="middle" 
                x={105 + num * (w - 300) / (c - 1)} 
                y={6 * h / 8 + 25}
            >
                {(p + num)}
            </text>
        </> 
    ));
}

function triangle (w: number, h: number, i: number, j: number , d: Data[]) {
    const c = getMaxDataCount(d);
    const b = bigOne(d);
    const x = 105 + j * ( w - 300 ) / ( c - 1 );
    const y = (3 * h / 4 - ((d[i].data[j] * 1) / b) * (h / 2));
    let colorGenerator = getColorGenerator();
    let colors = d.map((datum) =>  colorGenerator());
    const x1 = x;
    const y1 = y - 9;

    const x2 = x - 6;
    const y2 = y + 3;

    const x3 = x + 6;
    const y3 = y + 3;
    return (
        <polygon 
            key={i * 10 + j} 
            points={
                ' ' + x1 + ',' + y1 + 
                ' ' + x2 + ',' + y2 + 
                ' ' + x3 + ',' + y3 + 
                ''} 
            fill={colors[i]} 
            stroke-width={1}
        />
    ) ;
}

function star(w: number, h: number, i: number, j: number , d: Data[]) {
    const c = getMaxDataCount(d);
    const b = bigOne(d);
    const x = 105 + j * ( w - 300 ) / ( c - 1 );
    const y = (3 * h / 4 - ((d[i].data[j] * 1) / b) * ( h / 2 ));
    let colorGenerator = getColorGenerator();
    let colors = d.map((datum) =>  colorGenerator());
    const x1 = x;
    const y1 = y - 8;

    const x2 = x + 4;
    const y2 = y + 3;

    const x3 = x - 6;
    const y3 = y - 3;

    const x4 = x + 6;
    const y4 = y - 3;

    const x5 = x - 4;
    const y5 = y + 3;
    return(
    <polygon 
        key={i * 10 + j}
        points={
        ' ' + x1 + ',' + y1 + 
        ' ' + x2 + ',' + y2 + 
        ' ' + x3 + ',' + y3 + 
        ' ' + x4 + ',' + y4 + 
        ' ' + x5 + ',' + y5 + 
        ''} 
        fill={colors[i]} 
        stroke-width={1}
    />
    );

}

function pentagon(w: number, h: number, i: number, j: number , d: Data[]) {
    const c = getMaxDataCount(d);
    const b = bigOne(d);
    const x = 105 + j * ( w - 300 ) / ( c - 1 );
    const y = (3 * h / 4 - ((d[i].data[j] * 1) / b) * ( h / 2 ));
    let colorGenerator = getColorGenerator();
    let colors = d.map((datum) =>  colorGenerator());
    const x1 = x;
    const y1 = y - 8;

    const x2 = x + 6;
    const y2 = y - 3;

    const x3 = x + 4;
    const y3 = y + 3;

    const x4 = x - 4;
    const y4 = y + 3;

    const x5 = x - 6;
    const y5 = y - 3;
    return(
    <polygon 
        key={i * 10 + j}
        points={
        ' ' + x1 + ',' + y1 + 
        ' ' + x2 + ',' + y2 + 
        ' ' + x3 + ',' + y3 + 
        ' ' + x4 + ',' + y4 + 
        ' ' + x5 + ',' + y5 + 
        ''}
        fill={colors[i]} 
        stroke-width={1}
    />
    ); 
}

function drawHorizontalLines(w: number, h: number) {
    const arr = [ 1, 2, 3, 4, 5];
    return arr.map((num, i) => (
        <line 
            className="backgroundLines"
            key={i}
            x1={100} 
            y1={(i + 2) * h / 8} 
            x2={w - 190} 
            y2={(i + 2) * h / 8} 
        />
    ));
}

function yAxisInfos(w: number, h: number, d: Data[]) {
    const arr = [ 1, 2, 3, 4, 5];
    return arr.map((num, i) => (
        <text className="chart-label" key={i} textAnchor="end" x={100 - 5} y={(i + 2) * h / 8 + 5} >
            {(4 - i) * bigOne(d) / 4}
        </text>
    ));
}

function lineForData(w: number, h: number, i: number, j: number , d: Data[]) {
    const c = getMaxDataCount(d);
    const b = bigOne(d);
    let colorGenerator = getColorGenerator();
    let colors = d.map((datum) =>  colorGenerator());
    return(
        <line
            key={i * 10 + j} 
            x1={105 + j * ( w - 300 ) / ( c - 1)} 
            y1={(3 * h / 4 - ((d[i].data[j] * 1 ) / b ) * ( h / 2 ))}
            x2={105 + ( j + 1 ) * ( w - 300 ) / ( c - 1 )} 
            y2={(3 * h / 4 - ((d[i].data[j + 1] * 1 ) / b ) * ( h / 2 ))}
            stroke={colors[i]}
            stroke-width={1}
        />
    );
}

function drawDataLines(w: number, h: number, d: Data[]) {
    return d.map((ds, i) => (
        ds.data.map((nums, j) => (
            (j === ds.data.length - 1) ? 
                null : 
                lineForData(w, h, i, j, d)
        ))
    ));
}

function drawPoint(w: number, h: number, d: Data[]) {
    const c = getMaxDataCount(d);
    const b = bigOne(d);
    let colorGenerator = getColorGenerator();
    let colors = d.map((datum) =>  colorGenerator());
    return d.map((num, i) => (
        num.data.map((nums, j) => (
            (i % 5 === 0) ? (
            <circle 
                key={i * 10 + j}
                cx={105 + j * ( w - 300 ) / ( c - 1)} 
                cy={(3 * h / 4 - ((d[i].data[j] * 1) / b) * (h / 2))} 
                r={5} 
                fill={colors[i]} 
                stroke-width={1}
            /> 
            ) :
            (i % 5 === 1) ? (
            <rect 
                key={i * 10 + j}
                x={105 + j * ( w - 300) / ( c - 1 ) - 5} 
                y={(3 * h / 4 - ((d[i].data[j] * 1) / b) * (h / 2)) - 5} 
                width={10} 
                height={10} 
                fill={colors[i]} 
                stroke-width={1}
            />
            ) :
            (i % 5 === 2) ? 
            triangle(w, h, i, j, d) :
            (i % 5 === 3) ? 
            star(w, h, i, j, d) :
            (i % 5 === 4) ?
            pentagon(w, h, i, j, d) : null
        ))
    ));
}
export interface Title {
    text: string;
}

export interface Subtitle {
    text: string;
}

export interface YAxis {
    title: Title;
}

export interface PlotOptions {
    pointStart: number;
}

export interface Data {
    name: string;
    data: number[];
}

export interface LineChartData {
    title: Title;
    subtitle: Subtitle;
    yAxis: YAxis;
    plotOptions: PlotOptions;
    width: number;
    height: number;
    series: Data[];
}

export const LineChart = ({title, subtitle, yAxis, plotOptions, width, height, series}: LineChartData) => (
    <svg width={width} height={height}>
        <rect className="background" key="1" width={width} height={height}/>

        {drawHorizontalLines(width, height)}
        {yAxisInfos(width, height, series)}

        {xAxisDatas(series, width, height, plotOptions.pointStart)}

        <text className="chart-title" key="2" textAnchor="middle" x={width / 2} y="30">
            {title.text}
        </text>
        <text className="chart-subtitle" key="3" textAnchor="middle" x={width / 2} y="60">
            {subtitle.text}
        </text>
        <text 
            className="chart-label"
            key="4"
            textAnchor="middle" 
            x="30" 
            y={height / 2} 
            fill="gray" 
            transform={'rotate(-90 30,' + ( height / 2 ) + ' )'}
        >
            {yAxis.title.text}
        </text>
        {drawDataLines(width, height, series)}
        {drawPoint(width, height, series)}
        {placeNames(width, height, series)}
    </svg>
);
