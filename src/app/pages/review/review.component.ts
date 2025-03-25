import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StoreStatesTableComponent } from './store-states-table/store-states-table.component';
import { ValesStateTableComponent } from './vales-state-table/vales-state-table.component';
import { StateManagerService } from '../../services/state-manager.service';
import { StateSummary } from '../../interfaces/vales-data.interfaces';
import { ActivatedRoute } from '@angular/router';
import { FetchFilterComponent } from './fetch-filter/fetch-filter.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    PieChartComponent,
    StoreStatesTableComponent,
    ValesStateTableComponent,
    FetchFilterComponent
  ],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  states = [
    { id: 1, name: 'Jalisco' },
    { id: 2, name: 'Ciudad de México' },
    { id: 5, name: 'Monterrey' }
  ];
  
  selectedStateId = this.states[0].id;
  stateData: StateSummary | null = null;


  constructor(
    private route: ActivatedRoute,
    private stateManager: StateManagerService
  ) {}

  ngOnInit() {
    const resolvedData = this.route.snapshot.data['data'];
    if (resolvedData.initialState.success) {
      this.stateData = resolvedData.initialState.data;
      this.stateManager.updateState(this.states[0]);
    }
  }

}
