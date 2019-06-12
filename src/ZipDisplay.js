import React from 'react';
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
  		<h3>for {this.props.zipcode}</h3>
	  );
  }
}
