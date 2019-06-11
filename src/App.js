import React from 'react';
import ZipInput from './ZipInput.js';
import ZipDisplay from './ZipDisplay.js';

import './App.css';

export default class App extends React.Component {
  state = {
    zipcode: null
  };

  componentDidMount(){
    let zipcode = window.location.pathname.split('/')[1]
    this.setState({ zipcode });
  }

  render() {
    const zipcode = this.state.zipcode;
  return (
    <div className="App">
      Just the container & state holder
      {zipcode ? (<ZipDisplay />):(<ZipInput />)}
    </div>
  );
  }
}
