import * as React from 'react';
import { Text, LineChart } from '../../..';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Text text="Hello world!" />
                <LineChart data={[ 1, 2, 3, 4, 5, 6]}/>
            </div>
        );
    }
}

export default App;
