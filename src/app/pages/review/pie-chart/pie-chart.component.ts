import { Component, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit{
  ngOnInit(): void {
    this.initializeChart();
  }

  private initializeChart(): void {
    const options = {
      chart: {
        type: 'donut'
      },
      series: [44, 55, 13, 33],
      labels: ['En proceso', 'Descargado', 'Entregado', 'Afectado']
    }

   
    
    var chart = new ApexCharts(document.querySelector("#chart"), options);
    
    chart.render();
  }
}
