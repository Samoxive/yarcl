import './PieChart.scss';

import * as React from 'react';
import { getCircleCoordinates, PieCoordinates, normalPointToSVG } from './utils';

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

function getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export class Pie extends React.Component<PieProps> {
    render() {
        const { coordinates, color, showPercentage } = this.props;
        const c = coordinates;
        const halfwayPercentage = (c.percentage / 2) + c.previousPercentage;
        const percentageCoordinate = normalPointToSVG({
            x: Math.cos(2 * Math.PI * halfwayPercentage) / 2,
            y: Math.sin(2 * Math.PI * halfwayPercentage) / 2
        });

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
                        textAnchor={'end'}
                    >
                        {`${Math.floor(c.percentage * 1000) / 10}%`}
                    </text>) : null}
            </React.Fragment>
        );
    }
}

export const PieChart = ({title, data, options}: PieChartProps) => {
    let coords = getCircleCoordinates(data);
    let colors = data.map((datum) => datum.color ? datum.color : getRandomColor());

    return (
        <div className="pie-chart-container-vertical">
            <div className="pie-chart-title">
                {title}
            </div>
            <div className="pie-chart-container-horizontal">
                <div className="pie-chart">
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
                        <div key={i}>
                            <span><svg viewBox="0 0 2 2" className="pie-chart-label-svg">
                                <circle cx="1" cy="1" r="1" strokeWidth="0" fill={colors[i]} />
                            </svg></span>
                            <span>{datum.label}</span>
                        </div>)
                    )}
                </div>
            </div>
        </div>
    );
};
