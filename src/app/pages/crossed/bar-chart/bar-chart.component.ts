import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent implements OnInit, AfterViewInit {
  @Input() chartId: string = 'chart';

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeChart();
  }

  initializeChart() {
    const options = {
      chart: {
        type: 'bar',
        height: 450,
        width: '100%',
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '30%',
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -20,
        style: {
          fontSize: '12px'
        }
      },
      series: [{
        data: [{
          x: 'Sucursal A',
          y: 10
        }, {
          x: 'Sucursal B',
          y: 18
        }, {
          x: 'Sucursal C',
          y: 13
        },
       {
        x: 'Sucursal D',
        y: 18
       }
      ]
      }],
      xaxis: {
        labels: {
          rotate: -45,
          trim: true
        }
      }
    }

    let chart = new ApexCharts(document.querySelector('#'+this.chartId), options);
    chart.render();
  }
}
