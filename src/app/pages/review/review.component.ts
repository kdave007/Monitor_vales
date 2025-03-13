import { Component } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    CommonModule,
    PieChartComponent
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {

}
