import React from 'react';
import logo from './logo.svg';
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
