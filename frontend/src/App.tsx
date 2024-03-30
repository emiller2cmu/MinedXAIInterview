import React from 'react';
import './App.css';
import ModelList from './components/modelList';
import NavBar from './components/navbar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <ModelList/>
    </div>
  );
}

export default App;
