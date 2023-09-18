import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as userData from './../../assets/jsonfolder/chart.json';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
interface Highchart {
  name: string;
  type: string;
  title: string;
  xaxis: string;
  xlabel: string;
  ylabel: string;
  yaxis: number[] | null[];
  series: SeriesData[];
};

interface SeriesData {
  type: string;
  name: string;
  data: number[] | null[];
}

@Component({
  selector: 'app-rightsidebar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rightsidebar.component.html',
  styleUrls: ['./rightsidebar.component.css']
})

export class RightsidebarComponent implements OnInit {
  userData: any;
  reactiveForm!: FormGroup;
  highCharts!: Highchart;
  formField: any;
  changeChart!: string;
  pushChartData: any[] = [];
  @Output() valueChange = new EventEmitter();
  @Output() valueTableChange = new EventEmitter();
  @Output() onSubmitChange = new EventEmitter();
  constructor() {
    this.highCharts = {} as Highchart;
  }
  ngOnInit(): void {
    this.userData = userData;
    this.reactiveForm = new FormGroup({
      name: new FormControl(this.highCharts.name, [
        Validators.required,]),
      type: new FormControl('CombineChart', [
        Validators.required,]),
      title: new FormControl(this.highCharts.title, [
        Validators.required,]),
      xaxis: new FormControl('Years', [
        Validators.required,]),
      tableData: new FormControl('', [
        Validators.required,]),
    });
    // this.chartOptions = this.userData.ColumnChart;

    this.formField = this.userData['LineChart']
  }

  typeSelect(event: any): void {
    this.changeChart = event?.target?.value;
    this.formField = this.userData[event?.target?.value];
    // this.userData = this.userData[event.target.value];
    console.log(this.formField);
    this.valueChange.emit(event?.target?.value);
  }

  tableSelect(event:any): void {
    console.log(event.target.value,"80 line check");
    this.valueTableChange.emit(event?.target?.value);
  }

  getData(): boolean {

    if (this.formField?.xAxis?.categories || this.formField?.xAxis?.accessibility?.rangeDescription) {
      return true;
    } else if (this.formField?.xAxis?.title?.text) {
      return true;
    } else if (this.formField?.yAxis?.title?.text) {
      return true;
    } else {
      return false;
    }

  };

  xaxisSelect(event:any):void {
    console.log(event);
  }

  onSubmit(): void {
    console.log(this.reactiveForm.value);
    this.pushChartData.push(this.reactiveForm.value);
    console.log(this.pushChartData);
    this.onSubmitChange.emit(this.pushChartData);
    this.reactiveForm.reset();
    this.reactiveForm.patchValue({
      type: 'LineChart'
    });
    this.formField = this.userData['LineChart'];
    this.changeChart = 'LineChart';
    this.valueChange.emit('LineChart');
  }
}
