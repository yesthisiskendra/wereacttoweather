import React, {Component} from 'react';
import Chart from 'react-google-charts';
import './App.css';

class BarChart extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const data = this.props.barChartData

    return (
      <div className=" chart">
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