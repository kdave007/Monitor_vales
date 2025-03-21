import { AfterViewInit, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import ApexCharts from 'apexcharts';
import { ChartStatistics } from '../../../interfaces/vales-data.interfaces';
import { ValesDataService } from '../../../services/vales-data.service';
import { StateManagerService } from '../../../services/state-manager.service';
import { startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chartId: string = 'chart';
  
  private chart?: ApexCharts;
  private destroy$ = new Subject<void>();
  private chartData: ChartStatistics = {
    enProgreso: 0,
    descargados: 0,
    afectados: 0,
    total: 0
  };

  constructor(
    private valesService: ValesDataService,
    private stateManager: StateManagerService
  ) {}
  
  ngOnInit(): void {
    this.subscribeToStateChanges();
  }

  ngAfterViewInit(): void {
    this.initializeChart();
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
        startWith({ id: 1, name: 'Jalisco' } as any),
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
              console.log('Checkpoint');
              this.updateChartData();
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
        width: '90%'
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
    const total = this.chartData.total || 1; // Prevent division by zero
    return [
      Number(((this.chartData.enProgreso / total) * 100).toFixed(2)),
      Number(((this.chartData.descargados / total) * 100).toFixed(2)),
      Number(((this.chartData.afectados / total) * 100).toFixed(2))
    ];
  }
}
