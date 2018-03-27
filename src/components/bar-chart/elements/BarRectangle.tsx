import * as React from 'react';

export interface RectangleProps {
    x?: number;
    y?: number;
    w?: number;
    h?: number;

}

const BarRectangle: React.SFC<RectangleProps> = (props) => {
    const x = props.x;
    const y = props.y;
    const w = props.w;
    const h = props.h;
    return (
        <svg className="Rectangle" width="15" height="500">
            <rect x={x} y={y} width={w} height={h} fill="black"/>
        </svg>
    );
};

export default BarRectangle;