import React from 'react';
import BarChart from './BarChart.js';
import YearChart from './YearChart.js';
import Dropdown from './Dropdown.js';
import './App.css';

const [max, min] = [95, 75];
function getTemp(){
  let temp = Math.floor(Math.random() * (+max - +min)) + +min;
  return temp
}
function formatYearData(yearData){
  let formattedYearData = [yearData[0]]
  for(let i = 1; i < yearData.length - 1; i++){
    let array = []
    let yearInstance = yearData[i]
    let date = new Date (yearInstance[0], yearInstance[1], yearInstance[2])
    array.push(date, yearInstance[3])
    formattedYearData.push(array)
  }
  return formattedYearData
}

function generateYearData(year) {
  let yearData = [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Temp' }]];
  for(let i = 0; i < 12; i++){
    if (i == 1){
      for(let ii = 1; ii < 29; ii++){
        let temp = getTemp()
        yearData.push([year,i,ii, temp])
      }
    } else if ([0,2,4,6,7,9,11].includes(i)){
      for(let ii = 1; ii < 32; ii++){
        let temp = getTemp()
        yearData.push([year,i,ii, temp])
      }
    } else {
      for(let ii = 1; ii < 31; ii++){
        let temp = getTemp()
        yearData.push([year,i,ii, temp])
      }
    }
  }
  return yearData;
}

async function getYearData(year){
  let yearData;
  let storedYearData = JSON.parse(localStorage.getItem("wereacttoweather_" + year)) || ''
  if(storedYearData){
    console.log('STORED YEAR DATA', storedYearData)
    yearData = storedYearData;
    // formattedYearData = formatYearData(storedYearData)
  } else {
    const generatedYearData = await generateYearData(year)
    localStorage.setItem("wereacttoweather_" + year, JSON.stringify(generatedYearData));
    yearData = generatedYearData;
    // formattedYearData = formatYearData(generatedYearData)
  }
  return yearData;
}

function generateMonthData(month) {
  console.log('MONTH', month)
  let monthData = [['Day', 'Temperature', { role: 'style' }, { role: 'annotation' } ]]
  for(let i = 1; i < 32; i++){
    const [max, min] = [95, 75];
    let temp = Math.floor(Math.random() * (+max - +min)) + +min;
    monthData.push([i.toString(), temp, 'LightSkyBlue', temp])
  }
  return monthData;
}

export default class ZipDisplay extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	error: '', 
      data: '',
      yearData: '',
      year: 2018,
      month: 'June',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount(){
    let year = this.state.year
    this.getUpdatedData(year)
  }

  async getUpdatedData(year){
    let myYearData = await getYearData(year)
    this.setState({yearData: myYearData})
    let myFormattedData = await formatYearData(myYearData)
    this.setState({formattedData: myFormattedData})
  }

  handleDateChange(year){
    this.getUpdatedData(year)
  }

  clearLocalStorage(){
    localStorage.clear();
  }
  render(){
  	const error = this.state.error;
  	const zipcode = this.props.zipcode;
    // const week = ['this week', 'last week', 'next week']
    // const months = ['This month', 'January', 'February', 'March', 'April', 'May','July', 'August', 'September', 'October', 'November', 'December']
    const years = ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009']
    const yearData = this.state.yearData
    const formattedData = this.state.formattedData
    console.log('YEAR DATA FROM STATE', yearData)
  	return (
  		<div>
  			<h3>for {zipcode}</h3>
        <div className="row">
          <div className="col m3"></div>
          <div className="col m6">
            <div className="col m6 s12"><Dropdown options={years} title={"Year"} onDateChange={this.handleDateChange} /></div>
          </div>
          <div className="col m3"></div>
        </div>
  			<YearChart yearChartData={formattedData} />
        <button className="btn waves-effect waves-light" onClick={this.clearLocalStorage}>For Testing: Clear Local Storage</button>
  		</div>
	  );
  }
}
