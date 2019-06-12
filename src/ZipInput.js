import React from 'react';
import './App.css';

export default class ZipInput extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	error: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.redirectOnSubmit = this.redirectOnSubmit.bind(this);
  }

 	handleChange(e) {
    this.props.onZipChange(e.target.value);
  }

  redirectOnSubmit(event){
  	if(this.props.value.toString().length == 5){window.location.href = '/'+this.props.value}
  	else {
  		this.setState({ error: 'Please enter a 5 digit zip code' })
  	};
  	event.preventDefault();
  }

  render(){
  	const error = this.state.error;
  	return (
	    <form className="col s12" onSubmit={this.redirectOnSubmit}>
	      <div className="row"><div className="col s12 m3"></div>

	        <div className="input-field col s12 m6">
	          <i className="material-icons prefix">account_circle</i>
	          <input id="icon_prefix" type="text" value={this.props.value} onChange={this.handleChange}/>
	          {!this.props.value && <label htmlFor="icon_prefix">Zip Code</label> }
			      <button className="btn waves-effect waves-light" onClick={this.redirectOnSubmit}>Submit
		          <i className="material-icons right">send</i>
		        </button>
		        {error && <h5>{error}</h5>}
	        </div>

	      <div className="col s12 m3"></div></div>
	    </form>
	  );
  }
}
