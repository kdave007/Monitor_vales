import { Component, OnInit } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { StoreStatesTableComponent } from './store-states-table/store-states-table.component';
import { ValesStateTableComponent } from './vales-state-table/vales-state-table.component';
import { StateManagerService } from '../../services/state-manager.service';
import { ValesDataService } from '../../services/vales-data.service';
import { StateSummary } from '../../interfaces/vales-data.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    PieChartComponent,
    MatTabsModule,
    FormsModule,
    StoreStatesTableComponent,
    ValesStateTableComponent
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
    private stateManager: StateManagerService,
    private valesData: ValesDataService
  ) {}

  ngOnInit() {
    // Get initial data from resolver
    const resolvedData = this.route.snapshot.data['data'];
    if (resolvedData.initialState.success) {
      this.stateData = resolvedData.initialState.data;
      this.stateManager.updateState(this.states[0]);
    }
  }

  onStateChange(event: any) {
    this.selectedStateId = parseInt(event.target.value);
    const newState = this.states.find(state => state.id === this.selectedStateId);
    if (newState) {
      this.stateManager.updateState(newState);
      this.loadStateData();
    }
  }

  private loadStateData() {
    const currentState = this.currentState;
    if (currentState) {
      this.valesData.getStateData({ 
        id: currentState.id, 
        name: currentState.name
      }).subscribe({
        next: (response) => {
          if (response.success) {
            this.stateData = response.data;
          }
        }
      });
    }
  }

  get currentState() {
    return this.states.find(state => state.id === this.selectedStateId);
  }
}
