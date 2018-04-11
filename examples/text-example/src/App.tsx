import * as React from 'react';
import { Text, BarChart } from '../../..'; 

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Text text="Hello world!" />
                <BarChart 
                    title="Hello" 
                    label={['123456789012345678901234567890', '2', '3', '4', '5', '6', '12', '7', '25', '25']}
                    data={[2, 3, 4, 5, 6, 300000000000000000]}
                />
            </div>
        );
    }
}

export default App;
