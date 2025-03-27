import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ValesStateTableService } from '../../../services/vales-state-table.service';
import { FilterFetchService } from '../../../services/filter-fetch.service';


interface TableRow {
  estado: string;
  sucursalOrigen: string;
  sucursalDestino: string;
  count: number;
}

@Component({
  selector: 'app-vales-state-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vales-state-table.component.html',
  styleUrls: ['./vales-state-table.component.scss']
})
export class ValesStateTableComponent implements OnInit, AfterViewInit, OnDestroy {
  // Sample data
  tableData: TableRow[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private valesStateTable: ValesStateTableService,
    private filterFetchService : FilterFetchService
  ){}

  ngOnInit(): void {
    this.fetchFilterSuscription();
  }
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Calculate totals
  get totalRow(): TableRow {
    return {
      estado: 'Total general',
      sucursalOrigen: this.tableData.reduce((sum, row) => sum + Number(row.sucursalOrigen), 0).toString(),
      sucursalDestino: this.tableData.reduce((sum, row) => sum + Number(row.sucursalDestino), 0).toString(),
      count: this.tableData.reduce((sum, row) => sum + row.count, 0)
    };
  }


  // private stateDataSuscription(){
  //   this.stateManager.currentState$
  //   .pipe(
  //     //startWith({ id: 1, name: 'Jalisco' }),
  //     takeUntil(this.destroy$)
  //   )
  //   .subscribe( state => {
  //     console.log('vales table ',state)
  //     if(state){
  //       this.valesStateTable.getStateData(state.id)
  //       .pipe(
  //         takeUntil(this.destroy$)
  //       )
  //       .subscribe( response => {
  //         if(response.success) {
  //           this.tableData = response.data;
  //           console.log(response.data)
  //         }
  //       });
  //     }
  //   });
  // }

  private fetchFilterSuscription(){
    this.filterFetchService.currentParams$
    .pipe(
      //startWith({ id: 1, name: 'Jalisco' }),
      takeUntil(this.destroy$)
    )
    .subscribe( filterParams => {
      console.log('vales table ',filterParams)
      if(filterParams){
        this.valesStateTable.getStateData({ 
          id: filterParams.id, 
          name: filterParams.name,
          date : filterParams.date,
          date_type : filterParams.date_type 
        })
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe( response => {
          if(response.success) {
            this.tableData = response.data;
            console.log(response.data)
          }
        });
      }
    });
  }

}
