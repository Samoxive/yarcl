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
        
        this.t = {text: 'Denemesssssssssssssssdssss'};
        this.s = {text: 'deneme'};
        this.w = 500;
        this.h = 500;
        this.y = {title: {text: 'y Axis'}};
        this.d = [{name: 'emre', data: [ 1, 2, 3, 4, 5]}];
        this.p = {pointStart: 10};
        return (
            <div className="App">
                <LineChart t={this.t} s={this.s} y={this.y} p={this.p} w={this.w} h={this.h} d={this.d}/>
            </div>
        );
    }
}

export default App;
