import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecordsStatusComponent } from '../../components/status-records/status-records.component';

@Component({
  selector: 'app-main',
  imports: [
    CommonModule,
    RecordsStatusComponent,
    FormsModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  

}
