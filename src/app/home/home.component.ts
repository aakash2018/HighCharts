import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as userData from './../../assets/jsonfolder/chart.json';
import * as echarts from 'echarts';
import { RightsidebarComponent } from '../rightsidebar/rightsidebar.component';
import { LeftsidebarComponent } from '../leftsidebar/leftsidebar.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-home',
  standalone:true,
  imports:[RightsidebarComponent,LeftsidebarComponent,HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit  {
  title = 'highCharts';
  chartOptions!: Highcharts.Options;
  userData: any;
  chartData: [] = [];
  // tableOptions:any;
  // tableData:TableData[] = [];
  typeChart!: string;
  chart: any;
  myChart: any;
  options: any;
  ngOnInit(): void {
    this.userData = userData;
    this.chartOptions = this.userData.LineChart;
    console.log(this.userData, "35 line", this.chartOptions);
  }

  ngAfterViewInit(): void {
    // Highcharts.chart('chart-container', this.chartOptions);
    this.initChart();
  }


  initChart(): void {
    this.myChart = echarts.init(document.getElementById('chart-container'));
    var categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
    var barData = [10, 25, 15, 30, 20];
    var lineData = [50, 40, 30, 20, 10];
    var barTwo = [60, 20, 30, 10, 40];
    var lineTwo = [10, 40, 50, 20, 30];
    // Create the option object
    this.options = {
      title: {
        text: 'Combined Bar and Line Chart'
      },
      legend: {
        data: ['Bar Series', 'Line Series']
      },
      xAxis: {
        data: categories
      },
      yAxis: [
        {
          type: 'value',
          name: 'Bar Value',
          min: 0,
          max: 60
        },
        {
          type: 'value',
          name: 'Line Value',
          min: 0,
          max: 60
        }
      ],
      series: [
        {
          name: 'Bar Series',
          type: 'bar',
          data: barData,
          yAxisIndex: 0,
          itemStyle: {
            color: '#83BDBF'
          }
        },
        {

          name: 'Bar Series',
          type: 'bar',
          data: barTwo,
          yAxisIndex: 0,
          itemStyle: {
            color: '#fff68f'
          }
        },
        {
          name: 'Line Series',
          type: 'line',
          data: lineData,
          yAxisIndex: 1,
          itemStyle: {
            color: '#698869'
          }
        },
        {
          name: 'Line Series',
          type: 'line',
          data: lineTwo,
          yAxisIndex: 1,
          itemStyle: {
            color: '#8360aa'
          }
        }
      ]
    };

    // Set the chart options
    this.myChart.setOption(this.options);
  }
  onChanges(event: any) {
    console.log(event,"123 line");
    const barTypes:any = {
      'CombineChart': ['Bar Series', 'Line Series'],
      'barChart':['Bar Series'],
      'AreaChart':['Line Series']
    }; 
    this.options.legend.data = barTypes[event|| barTypes['default']];
    this.myChart.setOption(this.options);
    // this.typeChart = event;
    // if(event !=='Table'){
    //   setTimeout(() => {
    //     this.chartOptions = JSON.parse(JSON.stringify(this.userData[event]));
    //     Highcharts.chart('chart-container', this.chartOptions);
    //   }, 300);
    // }else{
    //   this.tableOptions = this.userData[event];
    //   console.log(this.tableOptions);
    // }
  }
  onTableChange(event: any) {
    console.log(event);
    // this.tableData = this.tableOptions[event];
    // console.log(this.tableData);
  }

  onSubmit(event: any) {
    console.log(event,"143 line check");
    this.chartData = event;
    this.options.title.text = event[event.length-1].name;
    const xAxisDataMap:any = {
      'years': ['2015', '2016', '2017', '2018', '2019'],
      'months': ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      'default': ['14-sep-2023', '15-sep-2023', '16-sep-2023', '17-sep-2023', '18-sep-2023']
    };
    
    this.options.xAxis.data = xAxisDataMap[event[event.length-1].xaxis.toLowerCase().trim()] || xAxisDataMap['default'];
    this.myChart.setOption(this.options);
  }
}
