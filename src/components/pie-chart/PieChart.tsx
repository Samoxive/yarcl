import './PieChart.scss';
import '../common.scss';

import * as React from 'react';
import * as ReactTooltip from 'react-tooltip';
import { getCircleCoordinates, PieCoordinates, normalPointToSVG } from './utils';
import { getColorGenerator } from '../../utils/colors';

export interface PieChartData {
    label: string;
    value: number;
    color?: string;
}

export interface PieChartOptions {
    showPercentage?: boolean;
    isDonut?: boolean;
    donutPercentage?: number;
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
    coordinates: PieCoordinates;
    showPercentage: boolean;
    isDonut: boolean;
    donutPercentage: number;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}

export class Pie extends React.Component<PieProps> {
    render() {
        const { coordinates, color, showPercentage, isDonut, donutPercentage, onMouseEnter, onMouseLeave } = this.props;
        const c = coordinates;
        const halfwayPercentage = (c.percentage / 2) + c.previousPercentage;
        const percentageCoordinate = c.percentage > 0.1 ? normalPointToSVG({
            x: Math.cos(2 * Math.PI * halfwayPercentage) * (isDonut ? ((2 - donutPercentage) / 2) : 0.5),
            y: Math.sin(2 * Math.PI * halfwayPercentage) * (isDonut ? ((2 - donutPercentage) / 2) : 0.5)
        }) : null;

        if (c.percentage > 0.99999999) {
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
                    {showPercentage && (
                        <text x={1} y={1} fontSize={0.1} textAnchor={'middle'}>~100%</text>
                    )}
                </React.Fragment>
            );
        }

        if (c.percentage < 0.00000001) {
            return null;
        }

        const bigArch = c.percentage > 0.5 ? 1 : 0;

        if (isDonut) {
            const per = donutPercentage;
            const startp1 = normalPointToSVG({
                x: Math.cos(2 * Math.PI * c.previousPercentage) * per,
                y: Math.sin(2 * Math.PI * c.previousPercentage) * per
            });
            const startp2 = normalPointToSVG({
                x: Math.cos(2 * Math.PI * (c.previousPercentage + c.percentage)) * per,
                y: Math.sin(2 * Math.PI * (c.previousPercentage + c.percentage)) * per 
            });

            return (
                <React.Fragment>
                    <path
                        className="pie"
                        d={`M ${startp1.x} ${startp1.y}
                            L ${c.p1.x} ${c.p1.y}
                            A 1 1 0 ${bigArch} 1 ${c.p2.x} ${c.p2.y}
                            L ${startp2.x} ${startp2.y}
                            A ${per} ${per} 0 ${bigArch} 0 ${startp1.x} ${startp1.y}
                            Z`}
                        fill={color}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    />
                    {showPercentage && percentageCoordinate ? 
                        (<text
                            x={percentageCoordinate.x}
                            y={percentageCoordinate.y}
                            fontSize={0.1}
                            textAnchor={'middle'}
                        >
                            {`${Math.floor(c.percentage * 1000) / 10}%`}
                        </text>) : null}
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <path
                    className="pie"
                    d={`M 1 1
                        L ${c.p1.x} ${c.p1.y}
                        M ${c.p1.x} ${c.p1.y}
                        A 1 1 0 ${bigArch} 1 ${c.p2.x} ${c.p2.y}
                        L 1 1
                        Z`}
                    fill={color}
                    stroke={'white'}
                    strokeWidth={0.01}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                />
                {showPercentage && percentageCoordinate ? 
                    (<text
                        x={percentageCoordinate.x}
                        y={percentageCoordinate.y}
                        fontSize={0.1}
                        textAnchor={'middle'}
                    >
                        {`${Math.floor(c.percentage * 1000) / 10}%`}
                    </text>) : null}
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
        const {title, data} = this.props;
        const options = this.props.options || ({showPercentage: true, donutPercentage: 0.5, isDonut: false});
        const showPercentage = options.showPercentage || true;
        const donutPercentage = options.donutPercentage || 0.5;
        const isDonut = options.isDonut || false;
        const {hoverId} = this.state;
        let coords = getCircleCoordinates(data);
        let colorGenerator = getColorGenerator();
        let colors = data.map((datum) => datum.color ? datum.color : colorGenerator());

        return (
            <div className="pie-chart pie-chart-container-vertical">
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
                                    coordinates={c}
                                    color={colors[i]}
                                    showPercentage={showPercentage}
                                    donutPercentage={donutPercentage}
                                    isDonut={isDonut}
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
                                <span className="chart-label">{datum.label}</span>
                            </div>)
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
