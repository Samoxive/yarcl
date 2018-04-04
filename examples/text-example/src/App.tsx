import * as React from 'react';
import { Text, BarChart } from '../../..'; 

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Text text="Hello world!" />
                <BarChart title="Hello" label={['asd', 'edf']} data={[1, 2, 3, 4, 5, 6, 12, 7, 25]}/>
            </div>
        );
    }
}

export default App;
