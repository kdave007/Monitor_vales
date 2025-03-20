import { Component } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { StoreStatesTableComponent } from './store-states-table/store-states-table.component';
import { ValesStateTableComponent } from './vales-state-table/vales-state-table.component';
import { StateManagerService } from '../../services/state-manager.service';
import { ValesDataService } from '../../services/vales-data.service';
import { StateSummary } from '../../interfaces/vales-data.interfaces';

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
export class ReviewComponent {
  states = [
    { id: 1, name: 'Jalisco' },
    { id: 2, name: 'Ciudad de México' },
    { id: 5, name: 'Monterrey' }
  ];
  
  selectedStateId = this.states[0].id;
  stateData: StateSummary | null = null;

  constructor(
    private stateManager: StateManagerService,
    private valesData: ValesDataService
  ) {
    this.loadStateData();
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
    this.valesData.getStateData({ 
      id: this.selectedStateId, 
      name: this.currentState?.name || '' 
    }).subscribe(response => {
      if (response.success) {
        this.stateData = response.data;
      }
    });
  }

  get currentState() {
    return this.states.find(state => state.id === this.selectedStateId);
  }
}
