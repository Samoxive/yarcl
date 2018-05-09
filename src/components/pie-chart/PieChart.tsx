import './PieChart.scss';
import '../common.scss';

import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import { getCircleCoordinates, getPointOnCircle, Point } from './utils';
import { getColorGenerator } from '../../utils/colors';

const SVG_SIZE = 500;
const CENTER = SVG_SIZE / 2;
const PIE_CHART_RADIUS = 125;
const PIE_CHART_TOP_LEFT = 125;
const PIE_CHART_TOP_LEFT_COORD: Point = {x: PIE_CHART_TOP_LEFT, y: PIE_CHART_TOP_LEFT};
const PIE_STROKE_WIDTH = 1;
const LABEL_LINE_RADIUS = 175;
const LABEL_LINE_TOP_LEFT = 75;
const LABEL_LINE_TOP_LEFT_COORD: Point = {x: LABEL_LINE_TOP_LEFT, y: LABEL_LINE_TOP_LEFT};
const LABEL_RADIUS = 200;
const LABEL_TOP_LEFT = 50;
const LABEL_TOP_LEFT_COORD: Point = {x: LABEL_TOP_LEFT, y: LABEL_TOP_LEFT};

export interface PieChartData {
    label: string;
    value: number;
    color?: string;
}

export interface PieChartOptions {
    isDonut?: boolean;
    donutPercentage?: number;
    pieStartingPercentage?: number;
}

export interface PieChartProps {
    title: string;
    data: PieChartData[];
    options?: PieChartOptions;
}

export interface PieChartState {
    hoverId: number;
}

export interface PieProps {
    label: string;
    color: string;
    percentage: number;
    previousPercentage: number;
    isDonut: boolean;
    donutPercentage: number;
    pieStartingPercentage: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export class Pie extends React.Component<PieProps> {
    render() {
        const { percentage,
                previousPercentage,
                color,
                label,
                isDonut,
                donutPercentage,
                pieStartingPercentage,
                onMouseEnter,
                onMouseLeave } = this.props;
        const p1 = getPointOnCircle(PIE_CHART_TOP_LEFT_COORD,
                                    PIE_CHART_RADIUS,
                                    previousPercentage,
                                    pieStartingPercentage);
        const p2 = getPointOnCircle(PIE_CHART_TOP_LEFT_COORD,
                                    PIE_CHART_RADIUS,
                                    previousPercentage + percentage,
                                    pieStartingPercentage);
        const topLeftDonut: Point = {
            x: PIE_CHART_TOP_LEFT + PIE_CHART_RADIUS * (1 - donutPercentage),
            y: PIE_CHART_TOP_LEFT + PIE_CHART_RADIUS * (1 - donutPercentage)
        };
        const innerDonutRadius = donutPercentage * PIE_CHART_RADIUS;
        const halfwayPercentage = previousPercentage + percentage / 2;
        const labelText = `${label} (${Math.floor(percentage * 1000) / 10}%)`;
        const labelTextPoint = getPointOnCircle(LABEL_TOP_LEFT_COORD,
                                                LABEL_RADIUS,
                                                halfwayPercentage,
                                                pieStartingPercentage);
        const labelLineP1 = getPointOnCircle(PIE_CHART_TOP_LEFT_COORD,
                                             PIE_CHART_RADIUS,
                                             halfwayPercentage,
                                             pieStartingPercentage);
        const labelLineP2 = getPointOnCircle(LABEL_LINE_TOP_LEFT_COORD,
                                             LABEL_LINE_RADIUS,
                                             halfwayPercentage,
                                             pieStartingPercentage);
        let labelElement = (
            <text className="chart-label pie-chart-label" x={labelTextPoint.x} y={labelTextPoint.y}>
                {labelText}
            </text>
        );
        let labelLineElement = (
            <line x1={labelLineP1.x} y1={labelLineP1.y} x2={labelLineP2.x} y2={labelLineP2.y} stroke="black" />
        );

        if (percentage > 0.99999999) {
            return (
                <React.Fragment>
                    <circle
                        cx={PIE_CHART_TOP_LEFT}
                        cy={PIE_CHART_TOP_LEFT}
                        r={PIE_CHART_RADIUS}
                        fill={color}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                    {labelElement}
                    {labelLineElement}
                    {isDonut && (
                        <circle
                            cx={topLeftDonut.x}
                            cy={topLeftDonut.y}
                            r={innerDonutRadius}
                            fill={'white'}
                        />
                    )}
                </React.Fragment>
            );
        }

        if (percentage < 0.00000001) {
            return null;
        }

        const bigArch = percentage > 0.5 ? 1 : 0;

        if (isDonut) {
            const startp1 = getPointOnCircle(topLeftDonut,
                                             donutPercentage * PIE_CHART_RADIUS,
                                             previousPercentage,
                                             pieStartingPercentage);
            const startp2 = getPointOnCircle(topLeftDonut,
                                             donutPercentage * PIE_CHART_RADIUS,
                                             previousPercentage + percentage,
                                             pieStartingPercentage);

            return (
                <React.Fragment>
                    <path
                        className="pie"
                        d={`M ${startp1.x} ${startp1.y}
                            L ${p1.x} ${p1.y}
                            A ${PIE_CHART_RADIUS} ${PIE_CHART_RADIUS} 0 ${bigArch} 1 ${p2.x} ${p2.y}
                            L ${startp2.x} ${startp2.y}
                            A ${innerDonutRadius} ${innerDonutRadius} 0 ${bigArch} 0 ${startp1.x} ${startp1.y}
                            Z`}
                        fill={color}
                        stroke={'white'}
                        strokeWidth={PIE_STROKE_WIDTH}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                    {labelElement}
                    {labelLineElement}
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <path
                    className="pie"
                    d={`M ${CENTER} ${CENTER}
                        L ${p1.x} ${p1.y}
                        M ${p1.x} ${p1.y}
                        A ${PIE_CHART_RADIUS} ${PIE_CHART_RADIUS} 0 ${bigArch} 1 ${p2.x} ${p2.y}
                        L ${CENTER} ${CENTER}
                        Z`}
                    fill={color}
                    stroke={'white'}
                    strokeWidth={PIE_STROKE_WIDTH}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
                    {labelElement}
                    {labelLineElement}
            </React.Fragment>
        );
    }
}

export class PieChart extends React.Component<PieChartProps, PieChartState> {
    state = {
        hoverId: 0,
        hovering: false,
    };

    render() {
        let {title, data} = this.props;
        data = data.sort((a, b) => b.value - a.value);
        const options = this.props.options || 
            ({donutPercentage: 0.5, isDonut: false, pieStartingPercentage: 0.25});
        const donutPercentage = options.donutPercentage || 0.5;
        const isDonut = options.isDonut || false;
        const pieStartingPercentage = 1 - (options.pieStartingPercentage || 0.25);
        const {hoverId} = this.state;
        let coords = getCircleCoordinates(data);
        let colorGenerator = getColorGenerator();
        let colors = data.map((datum) => datum.color ? datum.color : colorGenerator());
        const sum = data.reduce((acc, datum) => acc + datum.value, 0);
        const percentages = data.map((datum, i) => datum.value / sum);
        const coordPercentages = [0];
        let previousPercentage = 0;
        for (const percentage of percentages) {
            coordPercentages.push(previousPercentage);
            previousPercentage += percentage;
        }

        return (
            <div className="yarcl-chart pie-chart-container-vertical">
                <div className="chart-title">
                    {title}
                </div>
                <div className="pie-chart-container-horizontal">
                    <div className="pie-chart-svg">
                        <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} data-tip="" data-for="pie-chart-tooltip">
                            {coords.map((c, i) => (
                                <Pie
                                    key={i}
                                    label={data[i].label}
                                    color={colors[i]}
                                    percentage={percentages[i]}
                                    previousPercentage={coordPercentages[i + 1]}
                                    donutPercentage={donutPercentage}
                                    isDonut={isDonut}
                                    pieStartingPercentage={pieStartingPercentage}
                                    onMouseEnter={() => this.setState({hoverId: i})}
                                    onMouseLeave={() => this.setState({hoverId: -1})}
                                />)
                            )}
                        </svg>
                        <ReactTooltip
                            place="top"
                            type="light"
                            effect="float"
                            id="pie-chart-tooltip"
                            className="chart-tooltip"
                        >
                            {hoverId !== -1 ? (
                                <div>
                                    <div>{data[hoverId].label}</div>
                                    <div>{`${Math.floor(coords[hoverId].percentage * 1000) / 10}%`}</div>
                                </div>
                            ) : null}
                        </ReactTooltip>
                    </div>
                </div>
            </div>
        );
    }
}
