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
  	return (
  		<div>
  			<h3>for {this.props.zipcode}</h3>
  			<BarChart />
  			<YearChart />
  		</div>
	  );
  }
}
