import * as React from 'react';
import { LineChart, Title, Subtitle, yAxis, PlotOptions, Data } from '../../..';

class App extends React.Component {
    t: Title;
    s: Subtitle;
    y: yAxis;
    d: Data[];
    w: number;
    h: number;
    p: PlotOptions;
    render() {
        
        this.t = {text: 'First Atemp For Line Chart(TITLE)'};
        this.s = {text: 'Subtitle'};
        this.w = 700;
        this.h = 400;
        this.y = {title: {text: 'Y Axis'}};
        this.d = (
            [{name: 'DataBlock-1', data: [ 1, 2, 3, 4, 5]}, 
            {name: 'DataBlock-2', data: [ 5, 4, 3, 2, 1]}, 
            {name: 'DataBlock-3', data: [ 3, 3, 3, 3, 3]}]
        );
        this.p = {pointStart: 10};
        return (
            <div className="App">
                <LineChart t={this.t} s={this.s} y={this.y} p={this.p} w={this.w} h={this.h} d={this.d}/>
            </div>
        );
    }
}

export default App;
