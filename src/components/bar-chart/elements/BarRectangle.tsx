import * as React from 'react';
import './Circle.css';

export interface RectangleProps {
    x?: number;
    y?: number;
    w?: number;
    h?: number;

}

const BarRectangle: React.SFC<RectangleProps> = (props) => {
    const x = props.x;
    const y = props.y;
    const w = props.w || 30;
    const h = props.h || 30;
    return (
        <svg className="Rectangle" width="1000" height="1000">
            <rect x={x} y={y} width={w} height={h}/>
        </svg>
    );
};

export default BarRectangle;