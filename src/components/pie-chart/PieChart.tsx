import './PieChart.scss';
import '../common.scss';

import * as React from 'react';
import { getCircleCoordinates, PieCoordinates, normalPointToSVG } from './utils';
import { getColorGenerator } from '../../utils/colors';

export interface PieChartData {
    label: string;
    value: number;
    color?: string;
}

export interface PieChartOptions {
    showPercentage: boolean;
}

export interface PieChartProps {
    title: string;
    data: PieChartData[];
    options: PieChartOptions;
}

export interface PieProps {
    label: string;
    color: string;
    coordinates: PieCoordinates;
    showPercentage: boolean;
}

export class Pie extends React.Component<PieProps> {
    render() {
        const { coordinates, color, showPercentage } = this.props;
        const c = coordinates;
        const halfwayPercentage = (c.percentage / 2) + c.previousPercentage;
        const percentageCoordinate = c.percentage > 0.1 ? normalPointToSVG({
            x: Math.cos(2 * Math.PI * halfwayPercentage) / 2,
            y: Math.sin(2 * Math.PI * halfwayPercentage) / 2
        }) : null;

        if (c.percentage > 0.99999999) {
            return (
                <React.Fragment>
                    <circle cx={1} cy={1} r={1} fill={color} />
                    {showPercentage && (
                        <text x={1} y={1} fontSize={0.1} textAnchor={'middle'}>~100%</text>
                    )}
                </React.Fragment>
            );
        }

        if (c.percentage < 0.00000001) {
            return null;
        }

        return (
            <React.Fragment>
                <path
                    className="pie"
                    d={`M 1 1
                        L ${c.p1.x} ${c.p1.y}
                        M ${c.p1.x} ${c.p1.y}
                        A 1 1 0 ${c.percentage > 0.5 ? 1 : 0} 1 ${c.p2.x} ${c.p2.y}
                        L 1 1
                        Z`}
                    fill={color}
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

export const PieChart = ({title, data, options}: PieChartProps) => {
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
                    <svg viewBox="0 0 2 2">
                        {coords.map((c, i) => (
                            <Pie
                                key={i}
                                label={data[i].label}
                                coordinates={c}
                                color={colors[i]}
                                showPercentage={options.showPercentage}
                            />)
                        )}
                    </svg>
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
};
