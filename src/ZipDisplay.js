import React from 'react';
import BarChart from './BarChart.js';
import YearChart from './YearChart.js';
import './App.css';

export default class ZipDisplay extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	error: ''
    }
  }
  render(){
  	const error = this.state.error;
  	const zipcode = this.props.zipcode;
  	return (
  		<div>
  			<h3>for {zipcode}</h3>
  			<BarChart zipcode={zipcode}/>
  			<YearChart />
  		</div>
	  );
  }
}
