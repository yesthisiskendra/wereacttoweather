import React from 'react';
import ZipInput from './ZipInput.js';
import ZipDisplay from './ZipDisplay.js';

import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
      value: ''
    }
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleZipSubmit = this.handleZipSubmit.bind(this);
  };

  componentDidMount(){
    let zipcode = window.location.pathname.split('/')[1]
    this.setState({ zipcode });
  }

  handleZipChange(value){
    this.setState({ value })
  }

  handleZipSubmit(zipcode){
    this.setState({ zipcode })
  }

  render() {
    const value = this.state.value;
    const zipcode = this.state.zipcode;
    
    return (
      <div className="App">
        Just the container & state holder
        {zipcode ? (
          <ZipDisplay 
          />):(<ZipInput
            value={value}
            onZipChange={this.handleZipChange}
            onZipSubmit={this.handleZipSubmit}
          />)}
      </div>
    );
  }
}
