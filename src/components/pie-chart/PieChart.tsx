import './PieChart.scss';
import '../common.scss';

import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import { getCircleCoordinates, getPointOnCircle, Point } from './utils';
import { getColorGenerator } from '../../utils/colors';

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
                isDonut,
                donutPercentage,
                pieStartingPercentage,
                onMouseEnter,
                onMouseLeave } = this.props;
        const p1 = getPointOnCircle({x: 0, y: 0}, 1, previousPercentage, pieStartingPercentage);
        const p2 = getPointOnCircle({x: 0, y: 0}, 1, previousPercentage + percentage, pieStartingPercentage);

        if (percentage > 0.99999999) {
            return (
                <React.Fragment>
                    <circle
                        cx={1}
                        cy={1}
                        r={1}
                        fill={color}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                    {isDonut && (
                        <circle
                            cx={1}
                            cy={1}
                            r={donutPercentage}
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
            const per = donutPercentage;
            const topLeftDonut: Point = {x: (1 - donutPercentage), y: (1 - donutPercentage)};
            const startp1 = getPointOnCircle(topLeftDonut, per, previousPercentage, pieStartingPercentage);
            const startp2 = getPointOnCircle(topLeftDonut, per, previousPercentage + percentage, pieStartingPercentage);

            return (
                <React.Fragment>
                    <path
                        className="pie"
                        d={`M ${startp1.x} ${startp1.y}
                            L ${p1.x} ${p1.y}
                            A 1 1 0 ${bigArch} 1 ${p2.x} ${p2.y}
                            L ${startp2.x} ${startp2.y}
                            A ${per} ${per} 0 ${bigArch} 0 ${startp1.x} ${startp1.y}
                            Z`}
                        fill={color}
                        stroke={'white'}
                        strokeWidth={0.01}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <path
                    className="pie"
                    d={`M 1 1
                        L ${p1.x} ${p1.y}
                        M ${p1.x} ${p1.y}
                        A 1 1 0 ${bigArch} 1 ${p2.x} ${p2.y}
                        L 1 1
                        Z`}
                    fill={color}
                    stroke={'white'}
                    strokeWidth={0.01}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
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
                        <svg viewBox="0 0 2 2" data-tip="" data-for="pie-chart-tooltip">
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
                    <div className="pie-chart-container-vertical pie-chart-labels">
                        {data.map((datum, i) => (
                            <div key={i} className="pie-chart-label">
                                <span><svg viewBox="0 0 2 2" className="pie-chart-label-svg">
                                    <circle cx="1" cy="1" r="1" strokeWidth="0" fill={colors[i]} />
                                </svg></span>
                                <span className="chart-label">
                                    {`${datum.label} (${Math.floor(coords[i].percentage * 1000) / 10}%)`}
                                </span>
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
