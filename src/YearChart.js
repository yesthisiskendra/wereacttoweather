import React from 'react';
import Chart from 'react-google-charts';
import './App.css';

const [max, min] = [95, 75];
const year = 2018
function formatDateAndTemp(month, day){
	let temp = Math.floor(Math.random() * (+max - +min)) + +min;
	let date = new Date (year, month, day)
	let array = []
	array.push(date, temp)
	console.log(array, month, day)
	return array
}

function generateData() {
	const [max, min] = [95, 75];
  let yearData = [[{ type: 'date', id: 'Date' }, { type: 'number', id: 'Temp' }]];
  for(let i = 0; i < 12; i++){
    if (i == 1){
    	for(let ii = 1; ii < 29; ii++){
    		yearData.push(formatDateAndTemp(i,ii))
    	}
    } else if ([0,2,4,6,7,9,11].includes(i)){
    	for(let ii = 1; ii < 32; ii++){
    		yearData.push(formatDateAndTemp(i,ii))
    	}
    } else {
    	for(let ii = 1; ii < 31; ii++){
    		yearData.push(formatDateAndTemp(i,ii))
    	}
    }
  }
  return yearData;
}

function YearChart() {
	const mydata = generateData()
	console.log('year', mydata)
  return (
    <div className="">
    <h5>in 2018</h5>
      <Chart
        width={1000}
        height={350}
        chartType="Calendar"
        loader={<div>Loading Chart</div>}
        data={mydata}
        options={{
          title: '',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </div>
  );
}

export default YearChart;