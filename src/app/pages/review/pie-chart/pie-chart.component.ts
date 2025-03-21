import { AfterViewInit, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';
import { ChartStatistics } from '../../../interfaces/vales-data.interfaces';
import { ValesDataService } from '../../../services/vales-data.service';
import { StateManagerService } from '../../../services/state-manager.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  @Input() chartId: string = 'chart';
  
  private chart?: ApexCharts;
  private destroy$ = new Subject<void>();
  private chartData: ChartStatistics = {
    enProgreso: 0,
    descargados: 0,
    afectados: 0,
    total: 0
  };
  private chartInitialized = false;

  constructor(
    private valesService: ValesDataService,
    private stateManager: StateManagerService
  ) {}
  
  ngOnInit(): void {
    this.subscribeToStateChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private subscribeToStateChanges(): void {
    this.stateManager.currentState$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(state => {
        if (state) {
          this.valesService.getStateData({ 
            id: state.id, 
            name: state.name 
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe(response => {
            if (response.success && response.data) {
              this.chartData = response.data.porEstado;
              if (!this.chartInitialized) {
                this.initializeChart();
                this.chartInitialized = true;
              } else {
                this.updateChartData();
              }
            }
          });
        }
      });
  }

  private initializeChart(): void {
    const options = {
      chart: {
        type: 'donut',
        height: 450,
        width: '90%',
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350
          }
        }
      },
      series: this.getSeriesData(),
      labels: ['En progreso', 'Descargado', 'Afectado'],
      colors: ['#3B82F6', '#22C55E', '#F59E0B'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(1) + '%';
        }
      },
      legend: {
        position: 'right',
        offsetY: 20,
        fontSize: '14px'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 320
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    this.chart = new ApexCharts(document.querySelector(`#${this.chartId}`), options);
    this.chart.render();
  }

  private updateChartData(): void {
    if (this.chart) {
      this.chart.updateSeries(this.getSeriesData());
    }
  }

  private getSeriesData(): number[] {
    return [
      this.chartData.enProgreso,
      this.chartData.descargados,
      this.chartData.afectados
    ];
  }
}
