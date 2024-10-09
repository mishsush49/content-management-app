import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Tabs from './Tabs';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Tabs />
      </div>
    </Router>
  );
}

export default App;