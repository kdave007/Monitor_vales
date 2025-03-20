import { Component } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { StoreStatesTableComponent } from './store-states-table/store-states-table.component';
import { ValesStateTableComponent } from './vales-state-table/vales-state-table.component';


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
    { id: 3, name: 'Nuevo León' },
    { id: 4, name: 'Guadalajara' },
    { id: 5, name: 'Monterrey' }
  ];
  
  selectedStateId = this.states[0].id;

  onStateChange(event: any) {
    this.selectedStateId = parseInt(event.target.value);
  }

  get currentState() {
    return this.states.find(state => state.id === this.selectedStateId);
  }
}
