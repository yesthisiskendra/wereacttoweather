import React from 'react';
import BarChart from './BarChart.js';
import YearChart from './YearChart.js';
import Dropdown from './Dropdown.js';
import './App.css';

const months = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5, 
  July: 6,
  August: 7, 
  September: 8,
  October: 9,
  November: 10,
  December: 11
}

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

function generateMonthData(month) {
  let monthData = [['Day', 'Temperature', { role: 'style' }, { role: 'annotation' } ]]
  for(let i = 1; i < 32; i++){
    const [max, min] = [95, 75];
    let temp = Math.floor(Math.random() * (+max - +min)) + +min;
    monthData.push([i.toString(), temp, 'LightSkyBlue', temp])
  }
  return monthData;
}

function formatMonthData(month, yearData){
  let monthData = [['Day', 'Temperature', { role: 'style' }, { role: 'annotation' } ]]
  yearData.map((day) => {
    let strday = JSON.stringify(day)
    let daySplit = strday.split(',')
    if(day[1] == months[month]){
      monthData.push([day[2].toString(), day[3], 'LightSkyBlue', day[3]])
    }
  })
  return monthData
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
    yearData = storedYearData;
  } else {
    const generatedYearData = await generateYearData(year)
    localStorage.setItem("wereacttoweather_" + year, JSON.stringify(generatedYearData));
    yearData = generatedYearData;
  }
  return yearData;
}

export default class ZipDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '', 
      data: '',
      yearData: '',
      year: 2018,
      currentMonth: 'June',
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
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
    this.getMonthData(this.state.currentMonth, myYearData)
  }

  async getMonthData(month){
    let myMonthData = await formatMonthData(month, this.state.yearData)
    this.setState({monthData: myMonthData})
  }

  handleDateChange(year){
    this.getUpdatedData(year)
  }

  handleMonthChange(month){
    this.setState({ currentMonth: month})
    this.getMonthData(month)
  }

  clearLocalStorage(){
    localStorage.clear();
  }
  
  render(){
    const error = this.state.error;
    const zipcode = this.props.zipcode;
    const months = ['This month', 'January', 'February', 'March', 'April', 'May','July', 'August', 'September', 'October', 'November', 'December']
    const years = ['2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009']
    const yearData = this.state.yearData
    const formattedData = this.state.formattedData
    const monthData = this.state.monthData
    return (
      <div>
        <h3>for {zipcode}</h3>
        <div className="row">
          <div className="col m3"></div>
          <div className="col m6">
            <div className="col m6 s12"><Dropdown options={months} title={"Month"} onDateChange={this.handleMonthChange} /></div>
            <div className="col m6 s12"><Dropdown options={years} title={"Year"} onDateChange={this.handleDateChange} /></div>
          </div>
          <div className="col m3"></div>
        </div>
        <BarChart barChartData={monthData}/>
        <YearChart yearChartData={formattedData} />
        {/*<button className="btn waves-effect waves-light" onClick={this.clearLocalStorage}>For Testing: Clear Local Storage</button>*/}
      </div>
    );
  }
}
