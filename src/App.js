import React from 'react';
import logo from './logo.svg';
import cat from './crazy_cat_lady.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={cat} className="App-logo" alt="logo" />
        <p>
          Kendra (previously Osburn) Ryan
        </p>
        <a
          className="App-link"
          href="http://www.caterwaul.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Caterwaul
        </a>
        <a
          className="App-link"
          href="http://showmecats.herokuapp.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Show me cats
        </a>
      </header>
    </div>
  );
}

export default App;
