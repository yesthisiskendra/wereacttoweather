import React from 'react';
import BarChart from './BarChart.js';
import YearChart from './YearChart.js';
import Dropdown from './Dropdown.js';
import './App.css';

const [max, min] = [95, 75];
function formatDateAndTemp(year, month, day){
  let temp = Math.floor(Math.random() * (+max - +min)) + +min;
  let date = new Date (year, month, day)
  let array = []
  array.push(date, temp)
  return array
}

function generateYearData(year) {
  const [max, min] = [95, 75];
  let yearData = [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Temp' }]];
  for(let i = 0; i < 12; i++){
    if (i == 1){
      for(let ii = 1; ii < 29; ii++){
        yearData.push(formatDateAndTemp(year,i,ii))
      }
    } else if ([0,2,4,6,7,9,11].includes(i)){
      for(let ii = 1; ii < 32; ii++){
        yearData.push(formatDateAndTemp(year,i,ii))
      }
    } else {
      for(let ii = 1; ii < 31; ii++){
        yearData.push(formatDateAndTemp(year,i,ii))
      }
    }
  }
  return yearData;
}

function generateMonthData() {
  let month = [['Day', 'Temperature', { role: 'style' }, { role: 'annotation' } ]]
  for(let i = 1; i < 32; i++){
    const [max, min] = [95, 75];
    let temp = Math.floor(Math.random() * (+max - +min)) + +min;
    month.push([i.toString(), temp, 'LightSkyBlue', temp])
  }
  return month;
}

export default class ZipDisplay extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	error: '', 
      data: '',
      yearData: '',
      year: 2018
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }
  componentDidMount(){
    let year = "2018"
    this.getUpdatedData(year)
  }

  getUpdatedData(year){
    const mydata = generateMonthData()
    const myYearData = generateYearData(year)
    const data = (mydata)
    this.setState({data: mydata, yearData: myYearData})
  }
  handleDateChange(year){
    if(year == "Last Year"){
      year = "2018"
    } else if (isNaN(year)) {
      year = this.state.year
    } else {
      this.setState({year})
    }
    this.getUpdatedData(year)
  }
  render(){
  	const error = this.state.error;
  	const zipcode = this.props.zipcode;
    const week = ['this week', 'last week', 'next week']
    const months = ['This month', 'January', 'February', 'March', 'April', 'May','July', 'August', 'September', 'October', 'November', 'December']
    const years = ['Last Year', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009']
    const data = this.state.data
    const yearData = this.state.yearData
  	return (
  		<div>
  			<h3>for {zipcode}</h3>
        <div className="row">
          <div className="col m3"></div>
          <div className="col m6">
            <div className="col m6 s12"><Dropdown options={months} title={'Month'} onDateChange={this.handleDateChange}/></div>
            <div className="col m6 s12"><Dropdown options={years} title={"Year"} onDateChange={this.handleDateChange} /></div>
          </div>
          <div className="col m3"></div>
        </div>
  			<BarChart barChartData={data}/>
  			<YearChart yearChartData={yearData} />
  		</div>
	  );
  }
}
