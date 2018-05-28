import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
// import './BubbleChart.scss';
import '../common.scss';

export interface Title {
    text: string;
}
export interface Subtitle {
    text: string;
}
export interface Label {
    text: string;
    x?: number;
    y?: number;
}
export interface PlotLines {
    color?: string;
    dashStyle?: string;
    label: Label;
    value: number;
    width?: number;
}
export interface XAxis {
    gridLineWidth?: number;
    per: string;
    plotLines: PlotLines[];
    title?: Title;
    unitName: string;
}

export interface YAxis {
    gridLineWidth?: number;
    per: string;
    plotLines: PlotLines[];
    title?: Title;
    unitName: string;
}
export interface Data {
    x: number;
    y: number;
    z: number;
    shortName: string;
    fullName?: string;
}
export interface BubbleCharProps {
    title?: Title;
    subtitle?: Subtitle;
    xAxis: XAxis;
    yAxis: YAxis;
    width?: number;
    height?: number;
    zName?: string;
    series: Data[];
}

function Map(value: number, min1: number, max1: number, min2: number, max2: number) {
    // (v - min1) / (max1 - min 1) = (result - min2) / (max2 - min2)
    return min2 + (((max2 - min2) * (value - min1)) / (max1 - min1));
}

function BigX(series: Data[]) {
    let big = -Infinity;
    for (const s of series) {
        if (big < s.x) {
            big = s.x;
        }
    }
    return big;
}
function SmallX(series: Data[]) {
    let small = Infinity;
    for (const s of series) {
        if (small > s.x) {
            small = s.x;
        }
    }
    return small;
}
function BigY(series: Data[]) {
    let big = -Infinity;
    for (const s of series) {
        if (big < s.y) {
            big = s.y;
        }
    }
    return big;
}
function SmallY(series: Data[]) {
    let small = Infinity;
    for (const s of series) {
        if (small > s.y) {
            small = s.y;
        }
    }
    return small;
}
function BigZ(series: Data[]) {
    let big = -Infinity;
    for (const s of series) {
        if (big < s.z) {
            big = s.z;
        }
    }
    return big;
}
function SmallZ(series: Data[]) {
    let small = Infinity;
    for (const s of series) {
        if (small > s.z) {
            small = s.z;
        }
    }
    return small;
}

function DrawBackgroundLines(x1: number, y1: number, wx: number, wh: number, x2: number, y2: number) {
    const a = [1, 2, 3];
    const b = [1, 2, 3, 4];
    return(
        <>
            {a.map((i) =>
                <line 
                    key={i}
                    x1={x1}
                    y1={i * (y2 - y1) / (a.length + 1) + y1}
                    x2={x2}
                    y2={i * (y2 - y1) / (a.length + 1) + y1}
                    strokeWidth={wh}
                    stroke="gray"
                    opacity="0.8"
                />
            )}
            {b.map((i) =>
                <line 
                    key={10 + i}
                    x1={i * (x2 - x1) / (b.length + 1) + x1}
                    y1={y1}
                    x2={i * (x2 - x1) / (b.length + 1) + x1}
                    y2={y2}
                    strokeWidth={wx}
                    stroke="gray"
                    opacity="0.8"
                />
            )}
        </>
    );
}

function PutCircles(x1: number, y1: number, x2: number, y2: number, s: Data[], b: BubbleChart) {
    const bigX = BigX(s);
    const smallX = SmallX(s);
    const bigY = BigY(s);
    const smallY = SmallY(s);
    const bigZ = BigZ(s);
    const smallZ = SmallZ(s);

    return (
        s.map((d, index) => (
            <circle
                cx={Map(s[index].x, smallX, bigX, x1, x2)} 
                cy={Map(s[index].y, smallY, bigY, y2, y1)}
                r={Map(Math.sqrt(s[index].z), Math.sqrt(smallZ), Math.sqrt(bigZ), 3, 40)}
                stroke="rgba(255,0,0,0.8)"
                fill="rgba(255,0,0,0.5)"
                onMouseEnter={() => b.setState({hoverId: index})}
                onMouseLeave={() => b.setState({hoverId: -1})}
            />
        ))
    );
}
function PutDataShortNames(x1: number, y1: number, x2: number, y2: number, s: Data[]) {
    const bigX = BigX(s);
    const smallX = SmallX(s);
    const bigY = BigY(s);
    const smallY = SmallY(s);

    return (
        s.map((d, index) => (
            <text
                x={Map(s[index].x, smallX, bigX, x1, x2)}
                y={Map(s[index].y, smallY, bigY, y2, y1) + 5}
                textAnchor="middle"
                fill="black"
                fontWeight="bold"
            >
            {s[index].shortName}
            </text>
        ))
    );
}

function PutYAxisInfos(x: number, y1: number, y2: number, yAxis: YAxis, s: Data[]) {
    const bigY = BigY(s);
    const smallY = SmallY(s);
    const a = [1, 2, 3];
    return (
        a.map((i) => (
            <text
                key={i}
                x={x - 50}
                y={(a.length + 1 - i) * (y2 - y1) / (a.length + 1) + y1}
                strokeWidth="1"
                stroke="gray"
            >
            {'' + Math.floor(i * (bigY - smallY) / (a.length + 1) + smallY) + ' ' + yAxis.unitName}
            </text>
        ))
    );
}

function PutXAxisInfos(x1: number, x2: number, y: number, xAxis: XAxis, s: Data[]) {
    const bigX = BigX(s);
    const smallX = SmallX(s);
    const b = [1, 2, 3, 4];
    return (
        b.map((i) => (
            <text
                key={i}
                textAnchor="middle"
                x={i * (x2 - x1) / (b.length + 1) + x1}
                y={y + 15}
                strokeWidth="1"
                stroke="gray"
            >
            {'' + Math.floor(i * (bigX - smallX) / (b.length + 1) + smallX) + ' ' + xAxis.unitName}
            </text>
        ))
    );
}

function DrawGridLines(x1: number, y1: number, x2: number, y2: number, xAxis: XAxis, yAxis: YAxis, s: Data[]) {
    const bigX = BigX(s);
    const smallX = SmallX(s);
    const bigY = BigY(s);
    const smallY = SmallY(s);
    return(
        <>
            {xAxis.plotLines.map( (v, index) =>
            <>
                <line 
                    x1={x1}
                    x2={x2}
                    y1={Map(v.value, smallY, bigY, y2, y1)}
                    y2={Map(v.value, smallY, bigY, y2, y1)}
                    strokeWidth={(xAxis.gridLineWidth || 1)}
                    strokeDasharray={(v.dashStyle || '4, 4')}
                    stroke={(xAxis.plotLines[index].color ||  'black')}
                />
                <text
                    textAnchor="end"
                    x={x2 - 10 + (v.label.x || 0)} 
                    y={Map(v.value, smallY, bigY, y2, y1) - 10 + (v.label.y || 0)} 
                    fill="black" 
                >
                {
                    (v.value < bigY && v.value > smallY) ?
                    v.label.text + 
                    v.value +
                    xAxis.unitName + 
                    '/' + 
                    xAxis.per  : null
                }
                </text>
            </>
            )}
            {yAxis.plotLines.map( (v, index) =>
            <>
                <line 
                    x1={Map(v.value, smallX, bigX, x1, x2)}
                    x2={Map(v.value, smallX, bigX, x1, x2)}
                    y1={y1}
                    y2={y2}
                    strokeWidth={(yAxis.gridLineWidth || 1)}
                    strokeDasharray={(v.dashStyle || '4, 4')}
                    stroke={(yAxis.plotLines[index].color ||  'black')}
                />
                <text
                    x={Map(v.value, smallX, bigX, x1, x2) + 10 + (v.label.x || 0)} 
                    y={y1 + 20 + (v.label.y || 0)} 
                    fill="black" 
                >
                {
                    (v.value < bigX && v.value > smallX) ?
                    v.label.text + 
                    v.value +
                    yAxis.unitName + 
                    '/' + 
                    yAxis.per  : null
                }
                </text>
            </>
            )}
        </>
    );
}

export interface BubbleChartState {
    hoverId: number;
}

export class BubbleChart extends React.Component<BubbleCharProps, BubbleChartState> {
    state = {
        hoverId: 0,
        hovering: false,
    };
    render() {
        const width = this.props.width;
        const height = this.props.height;
        const xAxis = this.props.xAxis;
        const yAxis = this.props.yAxis;
        const series = this.props.series;
        const title = this.props.title;
        const zName = this.props.zName;
        const subtitle = this.props.subtitle;
        const {hoverId} = this.state;
        return(
            <>
                <svg 
                    width={width} 
                    height={height} 
                    viewBox={`0 0 ${width} ${height}`} 
                    data-tip="" 
                    data-for="bubble-chart-tooltip"
                >
                <rect  
                    key="1" 
                    width={width} 
                    height={height}
                    fill="white"
                />
                <rect  
                    key="2" 
                    x="100" 
                    y="100" 
                    width={(width || 900) - 150} 
                    height={(height || 600) - 150} 
                    stroke="black" 
                    fill="white" 
                    opacity="0.3"
                />
                    
                {
                    DrawBackgroundLines(
                        100, 
                        100, 
                        (xAxis.gridLineWidth || 1),
                        (yAxis.gridLineWidth || 1), 
                        (width || 900) - 50, 
                        (height || 600) - 50
                    )
                }
                {PutYAxisInfos(100, 100, (height || 600) - 50, yAxis, series)}
                {PutXAxisInfos(100, (width || 900) - 50, (height || 600) - 50, xAxis, series)}
                    
                {DrawGridLines(100, 100, (width || 900) - 50, (height || 600) - 50, xAxis, yAxis, series)}
                {PutDataShortNames(100, 100, (width || 900) - 50, (height || 600) - 50, series)}
                {PutCircles(100, 100, (width || 900) - 50, (height || 600) - 50, series, this)}
                    
                <text className="chart-title" key="3" textAnchor="middle" x={(width || 900) / 2} y="30">
                    {(title != null) ? title.text : ''}
                </text>
                <text className="chart-subtitle" key="4" textAnchor="middle" x={(width || 900) / 2} y="60">
                    {(subtitle != null) ? subtitle.text : ''}
                </text>
                <text // Y Name
                    className="chart-label"
                    key="5"
                    textAnchor="middle" 
                    x="30" 
                    y={(height || 600) / 2} 
                    fill="gray" 
                    transform={'rotate(-90 30,' + ( (height || 600) / 2 ) + ' )'}
                >
                    {(yAxis.title != null) ? yAxis.title.text : ''}
                </text>
                <text // X Name
                    className="chart-label"
                    key="6"
                    textAnchor="middle" 
                    x={(width || 900) / 2} 
                    y={(height || 600) - 10} 
                    fill="gray" 
                >
                    {(xAxis.title != null) ? xAxis.title.text : ''}
                </text>
                </svg>
                <ReactTooltip
                    place="top"
                    type="light"
                    effect="float"
                    id="bubble-chart-tooltip"
                    className="chart-tooltip"
                >
                    {hoverId !== -1 ? (
                        <div>
                            <div>{series[hoverId].fullName}</div>
                            <div>{(yAxis.title ? yAxis.title.text : ' Y Value') + ' : ' + series[hoverId].y}</div>
                            <div>{(xAxis.title ? xAxis.title.text : ' X Value') + ' : ' + series[hoverId].x}</div>
                            <div>{(zName || 'Z Value') + ' : ' + series[hoverId].x}</div>
                        </div>
                    ) : null}
                </ReactTooltip>
            </>
        );
   }
}
