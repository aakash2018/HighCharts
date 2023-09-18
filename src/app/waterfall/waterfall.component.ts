import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import * as echarts from 'echarts';
@Component({
  selector: 'app-waterfall',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './waterfall.component.html',
  styleUrls: ['./waterfall.component.css']
})
export class WaterfallComponent implements AfterViewInit {

  myChart: any;
  options: any;
  constructor() {
  }

  ngAfterViewInit(): void {
    this.initChart();

  };

  initChart(): void {
  
    this.myChart = echarts.init(document.getElementById('mainChart'));

    this.options = {
      title: {
        text: 'Waterfall Chart',
        subtext: 'Living Expenses in Shenzhen'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: function (params: any) {
          var tar = params[1];
          return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        splitLine: { show: false },
        data: ['Total', 'Rent', 'Utilities', 'Transportation', 'Meals', 'Other']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: [0, 1700, 1400, 1200, 300, 0]
        },
        {
          name: 'Life Cost',
          type: 'bar',
          stack: 'Total',
          label: {
            show: true,
            position: 'inside'
          },
          data: [2900, 1200, 300, 200, 900, 300]
        }
      ]
    };

    this.options && this.myChart.setOption(this.options);
  }
}
