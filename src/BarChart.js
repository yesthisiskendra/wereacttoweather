import React from 'react';
import Chart from 'react-google-charts';
import './App.css';

function generateData() {
  let month = [['Day', 'Temperature', { role: 'style' }, { role: 'annotation' } ]]
  for(let i = 1; i < 32; i++){
    const [max, min] = [95, 75];
    let temp = Math.floor(Math.random() * (+max - +min)) + +min;
    month.push([i.toString(), temp, 'LightSkyBlue', temp])
  }
  return month;
}

function BarChart() {
  const mydata = generateData()
  console.log('my data', mydata)
  const data = (mydata)
  return (
    <div className=" chart">
    <h5>in June, 2018</h5>
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

export default BarChart;