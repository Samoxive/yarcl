import * as React from 'react';
import './LineChart.scss';

export interface Title {
    text: string;
}

export interface PlotOptions {
    pointStart: number;
}

export interface YAxis {
    title: Title;
}

function BigOne(series: Data[]) {
    let big = 0;
    for (let i = 0; i < series.length; i++) {
        for (let j = 0; j < series[i].data.length; j++) {
            if (big < series[i].data[j]) {
                big = series[i].data[j];
            }
        }
    }
    return big;
}

function PlaceNames(w: number, h: number, d: Data[]) {
    return d.map((data, i) => {
        if (i % 5 === 0) {
            return (
                <>
                <text key={10 + i} className="dataBlock1-text" textAnchor="start" x={w - 140} y={(6 + i) * h / 16 + 25}>
                    {data.name}
                </text>
                <line
                    className="dataBlock1" 
                    key={20 + i}
                    x1={w - 180}
                    y1={(6 + i) * h / 16 + 25}
                    x2={w - 150} 
                    y2={(6 + i) * h / 16 + 25}
                />
                <circle  
                    className="dataBlock1"
                    key={i}
                    cx={w - 165} 
                    cy={(6 + i) * h / 16 + 25}  
                    r={5} 
                /> 
            </>
            );
        } else if (i % 5 === 1) {
            return(
            <>
            <text key={10 + i} className="dataBlock2-text" textAnchor="start" x={w - 140} y={(6 + i) * h / 16 + 25}>
                {data.name}
            </text>
            <line 
                className="dataBlock2"
                key={20 + i}
                x1={w - 180}
                y1={(6 + i) * h / 16 + 25}
                x2={w - 150} 
                y2={(6 + i) * h / 16 + 25}
            />
            <rect 
                className="dataBlock2"
                key={i}
                x={w - 170} 
                y={(6 + i) * h / 16 + 20} 
                width={10} 
                height={10} 
            />
        </>
            );
        } else if (i % 5 === 2) {
            return (
                <>
                <text key={10 + i} className="dataBlock3-text" textAnchor="start" x={w - 140} y={(6 + i) * h / 16 + 25}>
                    {data.name}
                </text>
                <line 
                    className="dataBlock3"
                    key={20 + i}
                    x1={w - 180}
                    y1={(6 + i) * h / 16 + 25}
                    x2={w - 150} 
                    y2={(6 + i) * h / 16 + 25}
                />
                <polygon 
                    className="dataBlock3"
                    key={i}
                    points={
                        ' ' + (w - 165) + ',' + ((6 + i) * h / 16 + 16) + 
                        ' ' + (w - 171) + ',' + ((6 + i) * h / 16 + 28) + 
                        ' ' + (w - 159) + ',' + ((6 + i) * h / 16 + 28) 
                    } 
                />
            </>
            );
        } else if (i % 5 === 3) {
            return(
                <>
                <text key={10 + i} className="dataBlock4-text" textAnchor="start" x={w - 140} y={(6 + i) * h / 16 + 25}>
                    {data.name}
                </text>
                <line 
                    key={20 + i}
                    className="dataBlock4"
                    x1={w - 180}
                    y1={(6 + i) * h / 16 + 25}
                    x2={w - 150} 
                    y2={(6 + i) * h / 16 + 25}
                />
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
                />
            </>
            );
        } else if (i % 5 === 4) {
            return (
                <>
                <text key={10 + i} className="dataBlock5-text" textAnchor="start" x={w - 140} y={(6 + i) * h / 16 + 25}>
                    {data.name}
                </text>
                <line 
                    className="dataBlock5"
                    key={20 + i}
                    x1={w - 180}
                    y1={(6 + i) * h / 16 + 25}
                    x2={w - 150} 
                    y2={(6 + i) * h / 16 + 25}
                />
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
                />
            </>
            );
        } else {
            return null;
        }
    });
}

function GetMaxDataCount(series: Data[]) {
    let maxCount = 0;
    for (let i = 0; i < series.length; i++) {
        if (maxCount < series[i].data.length) {
            maxCount = series[i].data.length;
        }
    }
    return maxCount;
}
    
function XAxisDatas(s: Data[], w: number, h: number, p: number) {
    let c = GetMaxDataCount(s);
    let arr = new Array(c);
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
            />
            <text 
                className="xAxisInfos-text" 
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

function Triangle (w: number, h: number, i: number, j: number , d: Data[]) {
    let c = GetMaxDataCount(d);
    let x1, x2, x3, y1, y2, y3, x, y;
    let b = BigOne(d);
    x = 105 + j * ( w - 300 ) / ( c - 1 );
    y = (3 * h / 4 - ((d[i].data[j] * 1) / b) * (h / 2));
    x1 = x;
    y1 = y - 9;

    x2 = x - 6;
    y2 = y + 3;

    x3 = x + 6;
    y3 = y + 3;
    return (
        <polygon 
            className="dataBlock3"
            key={i * 10 + j} 
            points={'' + x1 + ',' + y1 + ' ' + x2 + ',' + y2 + ' ' + x3 + ',' + y3 + ''} 
        />
    ) ;
}

function Star(w: number, h: number, i: number, j: number , d: Data[]) {
    let c = GetMaxDataCount(d);
    let b = BigOne(d);
    let x1, x2, x3, x4, x5, y1, y2, y3, y4, y5, x, y;
    x = 105 + j * ( w - 300 ) / ( c - 1 );
    y = (3 * h / 4 - ((d[i].data[j] * 1) / b) * ( h / 2 ));
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
    return(
    <polygon 
        className="dataBlock4"
        key={i * 10 + j}
        points={
        ' ' + x1 + ',' + y1 + 
        ' ' + x2 + ',' + y2 + 
        ' ' + x3 + ',' + y3 + 
        ' ' + x4 + ',' + y4 + 
        ' ' + x5 + ',' + y5 + 
        ''} 
    />
    );

}

function Pentagon(w: number, h: number, i: number, j: number , d: Data[]) {
    let c = GetMaxDataCount(d);
    let b = BigOne(d);
    let x1, x2, x3, x4, x5, y1, y2, y3, y4, y5, x, y;
    x = 105 + j * ( w - 300 ) / ( c - 1 );
    y = (3 * h / 4 - ((d[i].data[j] * 1) / b) * ( h / 2 ));
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
    return(
    <polygon 
        className="dataBlock5"
        key={i * 10 + j}
        points={
        ' ' + x1 + ',' + y1 + 
        ' ' + x2 + ',' + y2 + 
        ' ' + x3 + ',' + y3 + 
        ' ' + x4 + ',' + y4 + 
        ' ' + x5 + ',' + y5 + 
        ''} 
    />
    ); 
}

function DrawHorizontalLines(w: number, h: number) {
    let arr = [ 1, 2, 3, 4, 5];
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

function YAxisInfos(w: number, h: number, d: Data[]) {
    let arr = [ 1, 2, 3, 4, 5];
    return arr.map((num, i) => (
        <text className="yAxisInfos" key={i} textAnchor="end" x={100 - 5} y={(i + 2) * h / 8 + 5} >
            {(4 - i) * BigOne(d) / 4}
        </text>
    ));
}

function DrawDataLines(w: number, h: number, d: Data[]) {
    let c = GetMaxDataCount(d);
    let b = BigOne(d);
    return d.map((ds, i) => (
        ds.data.map((nums, j) => (
            (j === ds.data.length - 1) ? null : (
                (i % 5 === 0) ? (
                    <line
                        className="dataBlock1"
                        key={i * 10 + j} 
                        x1={105 + j * ( w - 300 ) / ( c - 1)} 
                        y1={(3 * h / 4 - ((d[i].data[j] * 1 ) / b ) * ( h / 2 ))}
                        x2={105 + ( j + 1 ) * ( w - 300 ) / ( c - 1 )} 
                        y2={(3 * h / 4 - ((d[i].data[j + 1] * 1 ) / b ) * ( h / 2 ))}
                    />
                ) :
                (i % 5 === 1) ? (
                    <line 
                        className="dataBlock2"
                        key={i * 10 + j}
                        x1={105 + j * ( w - 300 ) / ( c - 1 )} 
                        y1={(3 * h / 4 - ((d[i].data[j] * 1 ) / b ) * ( h / 2 ))}
                        x2={105 + ( j + 1 ) * ( w - 300 ) / ( c - 1 )} 
                        y2={(3 * h / 4 - ((d[i].data[j + 1] * 1 ) / b ) * ( h / 2 ))}
                    />
                    ) :
                (i % 5 === 2) ? (
                    <line
                        className="dataBlock3"
                        key={i * 10 + j}
                        x1={105 + j * ( w - 300 ) / ( c - 1 )} 
                        y1={(3 * h / 4 - ((d[i].data[j] * 1 ) / b ) * ( h / 2 ))}
                        x2={105 + ( j + 1 ) * ( w - 300 ) / ( c - 1)} 
                        y2={(3 * h / 4 - ((d[i].data[j + 1] * 1 ) / b ) * ( h / 2 ))}
                    />
                    ) :
                (i % 5 === 3) ? (
                    <line 
                        className="dataBlock4"
                        key={i * 10 + j}
                        x1={105 + j * ( w - 300) / ( c - 1 )} 
                        y1={(3 * h / 4 - ((d[i].data[j] * 1) / b) * ( h / 2 ))}
                        x2={105 + ( j + 1 ) * ( w - 300) / ( c - 1 )} 
                        y2={(3 * h / 4 - ((d[i].data[j + 1] * 1 ) / b ) * ( h / 2 ))}
                    />
                    ) :
                (i % 5 === 4) ? (
                    <line 
                        className="dataBlock5"
                        key={i * 10 + j}
                        x1={105 + j * ( w - 300) / ( c - 1 )} 
                        y1={(3 * h / 4 - ((d[i].data[j] * 1 ) / b ) * ( h / 2))}
                        x2={105 + ( j + 1 ) * ( w - 300) / ( c - 1)} 
                        y2={(3 * h / 4 - ((d[i].data[j + 1] * 1 ) / b ) * ( h / 2))}
                    />
                    ) : null 
            ) 
        ))
    ));
}

function DrawPoint(w: number, h: number, d: Data[]) {
    let c = GetMaxDataCount(d);
    let b = BigOne(d);
    return d.map((num, i) => (
        num.data.map((nums, j) => (
            (i % 5 === 0) ? (
            <circle 
                className="dataBlock1"
                key={i * 10 + j}
                cx={105 + j * ( w - 300 ) / ( c - 1)} 
                cy={(3 * h / 4 - ((d[i].data[j] * 1) / b) * (h / 2))} 
                r={5} 
            /> 
            ) :
            (i % 5 === 1) ? (
            <rect 
                className="dataBlock2"
                key={i * 10 + j}
                x={105 + j * ( w - 300) / ( c - 1 ) - 5} 
                y={(3 * h / 4 - ((d[i].data[j] * 1) / b) * (h / 2)) - 5} 
                width={10} 
                height={10} 
            />
            ) :
            (i % 5 === 2) ? 
            Triangle(w, h, i, j, d) :
            (i % 5 === 3) ? 
            Star(w, h, i, j, d) :
            (i % 5 === 4) ?
             Pentagon(w, h, i, j, d) : null
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

        {DrawHorizontalLines(width, height)}
        {YAxisInfos(width, height, series)}

        {XAxisDatas(series, width, height, plotOptions.pointStart)}

        <text className="title" key="2" textAnchor="middle" x={width / 2} y="30">
            {title.text}
        </text>
        <text className="subtitle" key="3" textAnchor="middle" x={width / 2} y="60">
            {subtitle.text}
        </text>
        <text 
            className="yAxis"
            key="4"
            textAnchor="middle" 
            x="30" 
            y={height / 2} 
            fill="gray" 
            transform={'rotate(-90 30,' + ( height / 2 ) + ' )'}
        >
            {yAxis.title.text}
        </text>
        {DrawDataLines(width, height, series)}
        {DrawPoint(width, height, series)}
        {PlaceNames(width, height, series)}
    </svg>
);
