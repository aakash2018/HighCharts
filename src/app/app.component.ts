import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as userData from './../assets/jsonfolder/chart.json';

interface SeriesData {
  type: string;
  name: string;
  data: number[] | null[];
}
interface TableData {
  id?:number;
  name?:string;
  email?:string;
  phone?:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'highCharts';
  chartOptions!: Highcharts.Options;
  userData: any;
  chartData:[]=[];
  tableOptions:any;
  tableData:TableData[] = [];
  typeChart!:string;
  chart:any;
  ngOnInit(): void {
    this.userData = userData;
    this.chartOptions = this.userData.LineChart;
  }
  
  ngAfterViewInit(): void {
    Highcharts.chart('chart-container', this.chartOptions);
  }
  
  onChanges(event: any) {

    this.typeChart = event;
    if(event !=='Table'){
      setTimeout(() => {
        this.chartOptions = JSON.parse(JSON.stringify(this.userData[event]));
        Highcharts.chart('chart-container', this.chartOptions);
      }, 300);
    }else{
      this.tableOptions = this.userData[event];
      console.log(this.tableOptions);
    }
  }
  onTableChange(event:any){
    console.log(event);
    this.tableData = this.tableOptions[event];
    console.log(this.tableData);
  }

  onSubmit(event: any) {
    console.log(event);
    this.chartData = event;
  }
}
