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
  };

  componentDidMount(){
    let zipcode = window.location.pathname.split('/')[1]
    this.setState({ zipcode });
  }

  handleZipChange(value){
    this.setState({ value })
  }

  render() {
    const value = this.state.value;
    const zipcode = this.state.zipcode;
    
    return (
      <div className="container centered">
        <h1>Historical Weather Data</h1>
        {zipcode ? (
          <ZipDisplay
            zipcode={zipcode}
          />):(<ZipInput
            value={value}
            onZipChange={this.handleZipChange}
          />)}
      </div>
    );
  }
}
