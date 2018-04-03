import * as React from 'react';
import { PieChart } from '../../..'; 
import '../../../lib/style.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <PieChart
                          title="Hello world!"
                          data={[{label: 'Hello', value: 1}, {label: 'World', value: 5}]}
                />
            </div>
        );
    }
}

export default App;
