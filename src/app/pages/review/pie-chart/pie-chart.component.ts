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
  @Input() initialData?: ChartStatistics;
  
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
    // Initialize with data if available
    if (this.initialData) {
      this.chartData = this.initialData;
      this.initializeChart();
      this.chartInitialized = true;
    }
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
          speed: 500,
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
      series: [this.chartData.enProgreso, this.chartData.descargados, this.chartData.afectados],
      labels: ['En Progreso', 'Descargados', 'Afectados'],
      colors: ['#3B82F6', '#22C55E', '#F59E0B'],
      legend: {
        position: 'right'
      }
    };

    this.chart = new ApexCharts(document.getElementById(this.chartId), options);
    this.chart.render();
  }

  private updateChartData(): void {
    if (this.chart) {
      this.chart.updateSeries([
        this.chartData.enProgreso,
        this.chartData.descargados,
        this.chartData.afectados
      ]);
    }
  }
}
