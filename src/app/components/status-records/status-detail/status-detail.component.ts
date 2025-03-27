import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SidebarService } from '../../../services/sidebar.service';
import { Subscription } from 'rxjs';

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

  private sidebarSub!: Subscription;
  popupMarginLeft = '283px';


  constructor(private sidebarService: SidebarService){}


  // Method to emit the close event
  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    this.sidebarSub = this.sidebarService.isCollapsed$.subscribe(isCollapsed => {
      this.popupMarginLeft = isCollapsed ? `-64px` : '-283px';
      console.log(this.popupMarginLeft)
    });
  }

  

  ngOnDestroy(): void {
    if (this.sidebarSub) {
      this.sidebarSub.unsubscribe();
    }
  }

}
