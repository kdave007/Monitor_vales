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
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

}
