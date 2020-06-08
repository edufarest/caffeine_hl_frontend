import React from 'react';
import './App.css';
import DrinksList from "./containers/DrinksList";
import CaffeineGraph from "./containers/CaffeineGraph"

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="">
          Welcome to Caffeine HL
      </header>

      <div>

          <p>Here goes the graph</p>
          <h3>Choose a drink:</h3>

          <CaffeineGraph/>

          <DrinksList/>


      </div>
    </div>
  );
}

export default App;
