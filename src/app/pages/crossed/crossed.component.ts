import { Component } from '@angular/core';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FetchFilterCrossComponent } from "./fetch-filter-cross/fetch-filter-cross.component";

@Component({
  selector: 'app-crossed',
  standalone: true,
  imports: [
    BarChartComponent,
    FetchFilterCrossComponent
],
  templateUrl: './crossed.component.html',
  styleUrl: './crossed.component.scss'
})
export class CrossedComponent {

}
