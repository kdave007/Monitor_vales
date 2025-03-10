import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-status-detail',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './status-detail.component.html',
  styleUrl: './status-detail.component.scss'
})
export class StatusDetailComponent implements OnInit {
  @Input() selectedRecord: any = null;
  @Input() currentPage: number = 1;
  @Output() pageChange = new EventEmitter<number>();
  @Output() close = new EventEmitter<void>(); // Event to notify the parent to close the window

  // Method to emit the close event
  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    console.log('Selected', this.selectedRecord);
  }


}
