import React from 'react';
import './App.css';
import DrinksList from "./containers/DrinksList";


function App() {
  return (
    <div className="App">
      <header className="App-header">
          Welcome to Caffeine HL
      </header>

      <div>

          <p>Here goes the graph</p>
          <h3>Choose a drink:</h3>

          <DrinksList />


      </div>
    </div>
  );
}

export default App;
