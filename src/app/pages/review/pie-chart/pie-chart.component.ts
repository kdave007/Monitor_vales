import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import ApexCharts from 'apexcharts';
import { ChartStatistics } from '../../../interfaces/vales-data.interfaces';
import { ValesDataService } from '../../../services/vales-data.service';
import { Subject, takeUntil } from 'rxjs';
import { FilterFetchService } from '../../../services/filter-fetch.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy {
  @Input() chartId: string = 'chart';
  @Input() initialData?: ChartStatistics;
  
  isLoading = true;
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
    private filterFetchService : FilterFetchService
  ) {}
  
  ngOnInit(): void {
    // Initialize with data if available
  
    //this.subscribeToStateChanges();
    this.subscribeToFilterParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.chart) {
      this.chart.destroy();
    }
  }

  // private subscribeToStateChanges(): void {
  //   this.stateManager.currentState$
  //     .pipe(
  //       takeUntil(this.destroy$)
  //     )
  //     .subscribe(state => {
  //       if (state) {
  //         this.valesService.getStateData({ 
  //           id: state.id, 
  //           name: state.name 
  //         })
  //         .pipe(takeUntil(this.destroy$))
  //         .subscribe(response => {
  //           if (response.success && response.data) {
  //             console.log('State service response : ',response.data);
  //             this.chartData = response.data.porEstado;
  //             if (!this.chartInitialized) {
             
  //               this.initializeChart();
  //               this.chartInitialized = true;
  //             } else {
  //               this.updateChartData();
  //             }
  //             this.isLoading = false;
  //           }
  //         });
  //       }
  //     });
  // }

  private subscribeToFilterParams(): void {
    this.filterFetchService.currentParams$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(filterParams => {
        if (filterParams) {
          this.valesService.getStateData({ 
            id: filterParams.id, 
            name: filterParams.name,
            date : filterParams.date,
            date_type : filterParams.date_type 
          })
          .pipe(takeUntil(this.destroy$))
          .subscribe(response => {
            if (response.success && response.data) {
              console.log('Filter params service response : ',response.data);
  
              this.chartData = response.data.porEstado;
              if (!this.chartInitialized) {
             
                this.initializeChart();
                this.chartInitialized = true;
              } else {
                this.updateChartData();
              }
              this.isLoading = false;
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
