import React from 'react';
import ZipInput from './ZipInput.js';
import ZipDisplay from './ZipDisplay.js';

import './App.css';

export default class App extends React.Component {
  state = {
    zipcode: null
  };

  render() {
  return (
    <div className="App">
      Just the container & state holder
      <ZipInput />
      <ZipDisplay />
    </div>
  );
  }
}


