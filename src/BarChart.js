import React, {Component} from 'react';
import Chart from 'react-google-charts';
import './App.css';
import Dropdown from './Dropdown.js';

function generateData() {
  let month = [['Day', 'Temperature', { role: 'style' }, { role: 'annotation' } ]]
  for(let i = 1; i < 32; i++){
    const [max, min] = [95, 75];
    let temp = Math.floor(Math.random() * (+max - +min)) + +min;
    month.push([i.toString(), temp, 'LightSkyBlue', temp])
  }
  return month;
}

class BarChart extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: ''
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount(){
    this.getUpdatedData()
  }

  getUpdatedData(){
    const mydata = generateData()
    console.log('my data', mydata)
    const data = (mydata)
    this.setState({data: mydata})
  }
  handleDateChange(){
    this.getUpdatedData()
  }

  render(){
  const data = this.state.data
  const week = ['this week', 'last week', 'next week']
  const months = ['This month', 'January', 'February', 'March', 'April', 'May','July', 'August', 'September', 'October', 'November', 'December']
  const years = ['Last Year', '2017', '2016']
  return (
    <div className=" chart">
    <div className="row">
      <div className="col m3"></div>
      <div className="col m6">
        {/*<div className="col m4 s12"><Dropdown options={week} title={'Week'} /></div>*/}
        <div className="col m6 s12"><Dropdown options={months} title={'Month'} onDateChange={this.handleDateChange}/></div>
        <div className="col m6 s12"><Dropdown options={years} title={"Year"} onDateChange={this.handleDateChange} /></div>
      </div>
      <div className="col m3"></div>
    </div>
    {/*<h3>In {this.props.zipcode} </h3>*/}

    <div className="chart-title"></div>
      <Chart
        height={300}
        chartType="ColumnChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: '',
          chartArea: { width: '100%' },
          colors: ['LightSkyBlue', 'SkyBlue', 'LightBlue'],
          animation:{
            duration: 2000,
            easing: 'in',
            startup: true,
          },
          hAxis: {
            title: '',
            minValue: 0,
          },
          vAxis: {
            minValue: 0,
            title: 'Degrees Fahrenheit',
          },
        }}
        legendToggle
      />
    </div>
  );
}
}

export default BarChart;