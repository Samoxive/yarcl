import * as React from 'react';

export interface RectangleProps {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
    canvasW?: number;
    canvasH?: number;
    color?: string;
}

function getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const BarRectangle: React.SFC<RectangleProps> = (props) => {
    const x = props.x;
    const y = props.y;
    const w = props.w;
    const h = props.h;
    const cW = props.canvasW || 15;
    const cH = props.canvasH || 500;
    const color = props.color || getRandomColor();
    return (
        <svg className="Rectangle" width={cW} height={cH * 10}>
            <rect x={x} y={y} width={w} height={h} fill={color}/>
        </svg>
    );
};

export default BarRectangle;