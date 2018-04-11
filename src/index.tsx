import * as React from 'react';

export interface TextProps {
    text: string;
}

export const Text = ({ text }: TextProps) => <h1>{text}</h1>;
export { LineChart, LineChartData, Title, Subtitle, YAxis, PlotOptions, Data } from './components/line-chart/LineChart';