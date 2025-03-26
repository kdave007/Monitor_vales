import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface FilterParams {
  id: number;
  name: string;
  date: string;
  date_type : string;
}

@Injectable({
  providedIn: 'root'
})
export class FilterFetchService {
   // BehaviorSubject to hold the current state
   private currentParamsSubject = new BehaviorSubject<FilterParams | null>(null);

   currentParams$ = this.currentParamsSubject.asObservable();


  updateState(state: FilterParams,) {
    this.currentParamsSubject.next(state);
  }

  getCurrentState(): FilterParams | null {
    return this.currentParamsSubject.getValue();
  }
}
