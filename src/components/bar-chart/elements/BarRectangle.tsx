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

const BarRectangle: React.SFC<RectangleProps> = (props) => {
    const x = props.x;
    const y = props.y;
    const w = props.w;
    const h = props.h;
    const cW = props.canvasW || 15;
    const cH = props.canvasH || 500;
    const color = props.color || 'black';
    return (
        <svg className="Rectangle" width={cW} height={cH}>
            <rect x={x} y={y} width={w} height={h} fill={color}/>
        </svg>
    );
};

export default BarRectangle;