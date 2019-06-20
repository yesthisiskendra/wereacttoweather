import React from 'react';
import BarChart from './BarChart.js';
import YearChart from './YearChart.js';
import Dropdown from './Dropdown.js';
import './App.css';

// function formatDateAndTemp(year, month, day){
//   let temp = Math.floor(Math.random() * (+max - +min)) + +min;
//   let date = new Date (year, month, day)
//   let array = []
//   array.push(date, temp)
//   return array
// }

const [max, min] = [95, 75];
function getTemp(){
  let temp = Math.floor(Math.random() * (+max - +min)) + +min;
  return temp
}
function formatYearData(yearData){
  console.log('getting here')
  let formattedYearData = [yearData[0]]
  for(let i = 1; i < yearData.length - 1; i++){
    let array = []
    let yearInstance = yearData[i]
    let date = new Date (yearInstance[0], yearInstance[1], yearInstance[2])
    array.push(date, yearInstance[3])
    formattedYearData.push(array)
  }
  console.log('FORMAT YEAR DATA', formattedYearData)
  return formattedYearData
}

function generateYearData(year) {
  let yearData = [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Temp' }]];
  for(let i = 0; i < 12; i++){
    if (i == 1){
      for(let ii = 1; ii < 29; ii++){
        let temp = getTemp()
        yearData.push([year,i,ii, temp])
        // yearData.push(formatDateAndTemp(year,i,ii))
      }
    } else if ([0,2,4,6,7,9,11].includes(i)){
      for(let ii = 1; ii < 32; ii++){
        let temp = getTemp()
        yearData.push([year,i,ii, temp])
        // yearData.push(formatDateAndTemp(year,i,ii))
      }
    } else {
      for(let ii = 1; ii < 31; ii++){
        let temp = getTemp()
        yearData.push([year,i,ii, temp])
        // yearData.push(formatDateAndTemp(year,i,ii))
      }
    }
  }
  console.log('YEAR DATA', yearData)
  return yearData;
}

async function getYearData(year){
  // Check if month/year is in local storage 
  let formattedYearData;
  let storedYearData = JSON.parse(localStorage.getItem("wereacttoweather_" + year)) || ''
  if(storedYearData){
    console.log('STORED YEAR DATA', storedYearData)
    formattedYearData = formatYearData(storedYearData)
    // myYearData = storedYear
    // console.log('STORED TYPE!', typeof(myYearData))
  } else {
    const generatedYearData = await generateYearData(year)
    localStorage.setItem("wereacttoweather_" + year, JSON.stringify(generatedYearData));
    // STORE IT
    // FORMAT IT
    formattedYearData = formatYearData(generatedYearData)
  }
  return formattedYearData;

  // and format
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

  getUpdatedData(year){
    // let myYearData;
    // // var user = JSON.parse(localStorage.getItem('user'))
    // let storedYear = JSON.parse(localStorage.getItem("wereacttoweather_" + year)) || ''
    // if(storedYear){
    //   myYearData = storedYear
    //   // console.log('STORED TYPE!', typeof(myYearData))
    // } else {
    //   myYearData = generateYearData(year)
    //   // console.log('Generated TYPE!', typeof(myYearData))
    //   // localStorage.setItem('user', JSON.stringify(myYearData))
    //   localStorage.setItem("wereacttoweather_" + year, JSON.stringify(myYearData));
    // }


    let myYearData = getYearData(year)
    this.setState({yearData: myYearData})
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
  			<YearChart yearChartData={yearData} />
        <button onClick={this.clearLocalStorage}>clear local storage</button>
  		</div>
	  );
  }
}
