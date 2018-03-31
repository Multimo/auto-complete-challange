import * as React from 'react';
import './App.css';
import Autocomplete from './components/Autocomplete/Autocomplete';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Find a bus for your next trip</h1>
          <p>Now serving bus schedules for 10436 cities in 89</p>
          <Autocomplete />
        </header>
      </div>
    );
  }
}

export default App;
