import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private isCollapsedSubject = new BehaviorSubject<boolean>(false);
  
  // Observable for components to subscribe to
  isCollapsed$: Observable<boolean> = this.isCollapsedSubject.asObservable();
  
  toggleSidebar(): void {
    const newState = !this.isCollapsedSubject.value;
    this.isCollapsedSubject.next(newState);
  }


}
