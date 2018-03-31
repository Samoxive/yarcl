import * as React from 'react';
import { Text } from '../../..'; 
import '../../../lib/style.css';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Text text="Hello world!" />
            </div>
        );
    }
}

export default App;
