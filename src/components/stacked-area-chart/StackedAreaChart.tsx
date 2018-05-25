import * as React from 'react';
import '../../components/area-chart/AreaChart.scss';
import '../common.scss';
import { getColorGenerator } from '../../utils/colors';
import * as ReactTooltip from 'react-tooltip';

export interface StackedAreaChartProps {
    title?: string;
    subtitle?: string;
    series: Series[];
    scale?: number;
    scaleLabel?: string[];
}
export interface Series {
    label: string;
    data: number[];
    color?: string;
}

export interface AreaChartState {
    hoverId: number;
}

const marX = 50;
const marY = 30;
const chartX = 300;
const chartY = 200;
const labelX = 5;
const labelY = 20;

function biggestNum(series: Series[]): number {
    let big = 0;
    for (let dataset of series) {
        if (Math.max(...(dataset.data)) > big) {
            big = Math.max(...(dataset.data));
        }
    }
    return big;
}

function biggestNumInArray(data: number[]): number {
    return (data.length > 0) ? Math.max(...data) : 0;
}

let SI_PREFIXES = ['', 'k', 'M', 'G', 'T', 'P', 'E'];

function numberPrefixed(num: number) {
    let tier = Math.log10(num) / 3 | 0;
    if (tier === 0) {return num; }
    let prefix = SI_PREFIXES[tier];
    let scale = Math.pow(10, tier * 3);
    let scaled = num / scale;
    return scaled.toFixed(2) + prefix;
}

function scaleYAxis(num: number | void, biggest: number) {
    let scale = num || 4;
    let texts = [];
    for (let i = 0; i <= scale; i++) {
        texts.push(
            <text
                className="chart-scale"
                key={i}
                x={labelX}
                y={(chartY * (scale - i) / scale) + marY + 4}
            >
            {numberPrefixed(i * biggest / (scale))}
            </text>);
    }
    return texts;
}

function scaleXAxis(num: number | void, biggest: number, scaleLabel?: string[]) {
    let scale = biggest - 1;
    let texts = [];
    for (let i = 0; i <= scale; i++) {
        texts.push(
            <text
                className="chart-scale"
                key={i}
                x={((chartX - 4) * (i) / scale) + marX}
                y={marY + chartY + labelY}
            >
            {scaleLabel || numberPrefixed(i)}
            </text>);
    }
    return texts;
}

function whereTheFirstPoint(data: number[]) {
    let i = biggestNumInArray(data);
    for (let j = 0; j < data.length; j++) {
        if (data[j] !== null && j < i) {
            i = j;
        }
    }
    return i;
}
function stacker (series: Series[]) {
    for (let n = 1; n < series.length; n++) {
        for (let i = 0; i < series[n].data.length; i++) {
            if (series[n].data[i] !== null) {
                series[n].data[i] += series[n - 1].data[i]; 
            }
        }
    }
}

function polygonStackPoints(series: Series[]) {
    let polygonStrings = [];
    let biggest = biggestNumInArray(series[series.length - 1].data);
    let maxLength = maxLengthOfAllArrays(series);

    for (let n = 0; n < series.length; n++) {
        let firstPoint = whereTheFirstPoint(series[n].data);
        let pointString = '';
        let i = 0;

        if (n === 0) {
            pointString = marX + (firstPoint * (chartX / (maxLength - 1))) + ',' + (marY + chartY) + ' ';
            for (let datum of series[n].data) {
                if (datum !== null) {
                    pointString += (marX + i) + ',' + (chartY - (datum * (chartY / biggest)) + marY) + ' ';
                }
                i += (chartX / (maxLength - 1));

            }
            i -= (chartX / (maxLength - 1));
            pointString +=  marX + i + ',' + (marY + chartY) + ' ';
        } else {
            
            for (let datum of series[n].data) {
                if (datum !== null) {
                    pointString += (marX + i) + ',' + (chartY - (datum * (chartY / biggest)) + marY) + ' ';
                }

                i += (chartX / (maxLength - 1));

            }
            i -= (chartX / (maxLength - 1));

            for (let k = series[n - 1].data.length - 1 ; k >= firstPoint; k--) {
                if (series[n - 1].data[k] !== null) {
                    pointString += (marX + i) + ',' + 
                                   (chartY - (series[n - 1].data[k] * (chartY / biggest)) + marY) + ' ';
                }
                i -= (chartX / (maxLength - 1));

            }
            i += (chartX / (maxLength - 1));

        }
        
        polygonStrings.push(pointString);
    }

    return polygonStrings;
}

function maxLengthOfAllArrays(series: Series[]): number {
    return Math.max(...(series.map((serie) => serie.data.length)));
}

export class StackedAreaChart extends React.Component<StackedAreaChartProps, AreaChartState> {
    state = {
        hoverId: 0
    };

    copy(series: Series[]): Series[] {
        return JSON.parse(JSON.stringify(series));
    }

    drawRects(maxLen: number) {
        let texts = [];
        for (let i = 0; i < maxLen; i++) {
            texts.push(
                <rect
                    key={i}
                    x={((chartX - 4) * (i) / (maxLen)) + marX}
                    width={((chartX - 4) * (i + 1) / (maxLen)) - (((chartX - 4) * (i) / (maxLen)))}
                    y={marY}
                    height={marY + chartY}
                    opacity="0"
                    onMouseEnter={() => this.setState({hoverId: i})}
                    onMouseLeave={() => this.setState({hoverId: -1})}
                />
            );
        }
        return texts;
    }
    
    render() {
        let {series, title, subtitle, scale, scaleLabel} = this.props;
        let stackSeries = this.copy(series);
        const {hoverId} = this.state;
        stacker(stackSeries);
        const colorGenerator = getColorGenerator();
        let biggest = biggestNum(stackSeries);
        const maxLen = maxLengthOfAllArrays(stackSeries);
        let colors = stackSeries.map((datum) => datum.color ? datum.color : colorGenerator());
        let polyPoints = polygonStackPoints(stackSeries);

        return (
            <div className="yarcl-chart stacked-area-chart">
                {/*Title*/}
                <div className="chart-title">
                    {title}
                </div>
                <div className="chart-subtitle">
                    {subtitle}
                </div>
                <svg 
                    viewBox={`0 0 ${chartX + marX + 100} ${chartY + marY + 50}`} 
                    data-tip="" 
                    data-for="area-chart-tooltip"
                >
                    <rect width="100%" height="100%" fill="white"/>
                    {/*Polygon*/}
                    {
                        polyPoints.map((num, i) =>
                            <polygon
                                key={i}
                                points={num}
                                fill={stackSeries[i].color || colors[i]}
                                stroke="white"
                                strokeWidth="1"
                                opacity="1"
                            />
                        )   
                    }
                        {
                        scaleYAxis(scale, biggest)
                        }
                    {/*Y axis*/}
                    <line 
                        x1={marX}
                        x2={marX} 
                        y1={marY} 
                        y2={marY + chartY}
                        stroke="black"
                        strokeWidth="4" 
                    />
                    {/*X axis*/}
                    <line 
                        x1={marX - 2} 
                        x2={marX + chartX - 0.5}
                        y1={marY + chartY}
                        y2={marY + chartY}
                        stroke="black"
                        strokeWidth="4" 
                    />
                    {/*Scale of X axis*/}
                        {
                            scaleXAxis(scale, maxLen, scaleLabel)
                        }
                    {/*Legend*/}
                    {stackSeries.map((num, i) =>
                            <circle
                                key={i}
                                cx={marX + chartX + 20}
                                cy={marY + chartY + (i * - 20)}
                                r={5}
                                fill={stackSeries[i].color || colors[i]}
                                opacity="1"
                            />
                        )
                    }
                    {stackSeries.map((num, i) =>
                            <text
                                key={i}
                                x={marX + chartX + 30}
                                y={marY + 5 + chartY + (i * - 20)}
                                // fill={series[i].color || colors[i]}
                                className="chart-label"
                            >
                            {stackSeries[i].label}
                            </text>
                        )
                    }
                    {this.drawRects(maxLen)}
                </svg>
                
                <ReactTooltip
                    place="top"
                    type="light"
                    effect="float"
                    id="area-chart-tooltip"
                    className="chart-tooltip"
                >
                    {hoverId !== -1 ? (
                        <div>
                            {series.map((num, i) =>
                            <div key={i}>{series[i].label + ': ' + series[i].data[hoverId]}</div>
                            )
                            }
                        </div>
                    ) : null}
                </ReactTooltip>
            </div>

        );
    }
}
