import React, {Component} from 'react';
import Chart from 'react-google-charts';
import './App.css';

class YearChart extends Component {
  constructor(props){
    super(props);
  }
  render(){
  const mydata = this.props.yearChartData;
  return (
    <div className="">
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
}

export default YearChart;