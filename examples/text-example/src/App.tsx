import * as React from 'react';
import { Text } from '../../..'; 
import { Line } from '../../../src/components/line-chart/LineChart';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Text text="Hello world!" />
                <Line data={[ 1, 2, 3, 4, 5, 6]}/>
            </div>
        );
    }
}

export default App;
