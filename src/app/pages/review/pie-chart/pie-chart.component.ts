import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';



@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @Input() chartId: string = 'chart';
  
  
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    const options = {
      chart: {
        type: 'donut',
        height: 450,
        width: '90%'
      },
      series: [44, 27, 33],
      labels: ['En proceso', 'Descargado','Afectado'],
      legend: {
        position: 'right',
        offsetY: 0,
        fontSize: '16px'
      },
    
      dataLabels: {
        style: {
          fontSize: '16px'  // Increased font size
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            height: 500
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
    
    let chart = new ApexCharts(document.querySelector('#'+this.chartId), options);
    chart.render();
  }
}
