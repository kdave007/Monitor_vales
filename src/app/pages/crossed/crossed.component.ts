import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@Component({
  selector: 'app-crossed',
  standalone: true,
  imports: [
    BarChartComponent
  ],
  templateUrl: './crossed.component.html',
  styleUrl: './crossed.component.scss'
})
export class CrossedComponent {

}
