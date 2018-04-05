import * as React from 'react';
import { LineChart, Title, Subtitle, YAxis, PlotOptions, Data } from '../../..';

class App extends React.Component {
    t: Title;
    s: Subtitle;
    y: YAxis;
    ds: Data[];
    w: number;
    h: number;
    p: PlotOptions;
    render() {
        
        this.t = {text: 'First Atemp For Line Chart(TITLE)'};
        this.s = {text: 'Subtitle'};
        this.w = 700;
        this.h = 400;
        this.y = {title: {text: 'Y Axis'}};
        this.ds = (
            [{name: 'DataBlock-1', data: [4394, 5203, 5717, 6658, 9731, 1131, 1333, 1545]}, 
            {name: 'DataBlock-2', data: [2416, 2064, 2942, 2851, 3290, 3082, 3821, 4434]},
            {name: 'DataBlock-3', data: [1144, 1722, 1605, 1971, 1085, 2477, 3247, 3987]}, 
            {name: 'DataBlock-4', data: [98, 788, 788, 1169, 1512, 2452, 3400, 3227]}, 
            {name: 'DataBlock-5', data: [1208, 598, 805, 1248, 889, 1816, 1874, 1811]}]
        );
        this.p = {pointStart: 10};
        return (
            <div className="App">
                <LineChart 
                    title={this.t} 
                    subtitle={this.s} 
                    yAxis={this.y} 
                    plotOptions={this.p} 
                    width={this.w} 
                    height={this.h}
                    series={this.ds}
                />
            </div>
        );
    }
}

export default App;
