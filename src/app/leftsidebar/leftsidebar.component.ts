import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AngularDraggableModule } from 'angular2-draggable';
import * as Highcharts from 'highcharts';
import * as userData from './../../assets/jsonfolder/chart.json';
;
interface TableData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
}
@Component({
  selector: 'app-leftsidebar',
  standalone: true,
  imports: [CommonModule, AngularDraggableModule],
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit, AfterViewInit {
  @Input() chartData: any;
  @ViewChildren('myBounds') boundElements!: QueryList<ElementRef>;
  position: any;
  chartOptions!: Highcharts.Options;
  userData: any = userData;
  displayStyle = "none";
  inBounds = true;
  positionData: any[] = [];
  resizePositionData: any[] = [];
  tableOptions: any;
  tableData: TableData[] = [];
  constructor(private elementRef: ElementRef) {

  }

  ngOnInit(): void {
    this.userData = userData;
    console.log(this.chartData);
    this.chartData.forEach((element: any, index: number): void => {
      if (element.type !== 'Table') {
        this.chartOptions = this.userData[element.type];
        const containerId = `chart-container-${index}`;
        const container = this.elementRef.nativeElement.querySelector(`#${containerId}`);
        Highcharts.chart(container, this.chartOptions);
      } else {
        this.tableOptions = this.userData[element.type];
        console.log(this.tableOptions);
        this.tableData = this.tableOptions[element.tableData];
      }
    })
  }

  ngAfterViewInit(): void {
    this.boundElements.toArray().forEach((element, i) => {
      // Set the [bounds] property dynamically based on the current element
      element.nativeElement['bounds'] = this.boundElements.toArray()[i];
    });
  }

  // ngAfterContentInit() {

  //   this.chartOptions = JSON.parse(JSON.stringify(this.userData.LineChart));
  //   Highcharts.chart('chart-container', this.chartOptions);

  // }

  openChartModal() {
    this.displayStyle = "block";
    this.chartData.forEach((element: any, index: number): void => {
      console.log(index);
      // this.chartOptions = this.userData[element.type];
      // const containerId = `chart-container-${index}`;
      // const container = this.elementRef.nativeElement.querySelector(`#${containerId}`);
      // Highcharts.chart(container, this.chartOptions);
      if (element.type !== 'Table') {
        this.chartOptions = this.userData[element.type];
        const containerId = `chart-container-${index}`;
        const container = this.elementRef.nativeElement.querySelector(`#${containerId}`);
        Highcharts.chart(container, this.chartOptions);
      } else {
        this.tableOptions = this.userData[element.type];
        console.log(this.tableOptions);
        this.tableData = this.tableOptions[element.tableData];
      }
    })
  }

  closePopup() {
    this.displayStyle = "none";
  }

  // ngAfterViewInit() {
  //   this.chartOptions = JSON.parse(JSON.stringify(this.userData.LineChart));
  //   Highcharts.chart('chart-container', this.chartOptions);


  //   console.log("dddd", this.chartOptions);
  // }

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('angular-demo.pdf');
    });

  }


  onMoveEnd(event: any, keys: any) {
    console.log(event);
    const data = {
      [keys]: {
        position: event
      }
    };

    if (this.positionData?.length > 1) {
      this.positionData.forEach((items, index) => {
        for (const key in items) {
          if (key === keys) {
            this.positionData.splice(index, 1);
            this.positionData.push(data);
          }
        }

      });
    } else {
      this.positionData.push(data);
    }

  }

  onResizeStop(event: any, keys: any) {
    const data = {
      [keys]: {
        size: event.size
      }
    }
    if (this.resizePositionData?.length > 1) {
      this.resizePositionData.forEach((items, index) => {
        for (const key in items) {
          if (key === keys) {
            this.resizePositionData.splice(index, 1);
            this.resizePositionData.push(data);
          }
        }
      });
    } else {
      this.resizePositionData.push(data);
    }
  }

  newPosition(event: any) {
    console.log(event, "131")
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const element = event.currentTarget;
    // const x = event.pageX - boundingRect.left;
    const x = element.offsetLeft;
    const y = element.offsetTop;
    this.position = "(" + x + ", " + y + ")";
  }

}
