import * as React from 'react';

export interface TextProps {
    text: string;
}

export const Text = ({ text }: TextProps) => <h1>{text}</h1>;
export { LineChart } from './components/line-chart/LineChart';
export { PieChart } from './components/pie-chart/PieChart';
export { BarChart } from './components/bar-chart/BarChart';
export { AreaChart } from './components/area-chart/AreaChart';
export { BubbleChart } from './components/bubble-chart/BubbleChart';
export { HeatmapChart } from './components/heatmap-chart/HeatmapChart';
