import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterParams } from '../interfaces/vales-data.interfaces';



@Injectable({
  providedIn: 'root'
})
export class FilterFetchService {
   // BehaviorSubject to hold the current state
   private currentParamsSubject = new BehaviorSubject<FilterParams | null>(null);

   currentParams$ = this.currentParamsSubject.asObservable();


  updateState(FilterParams: FilterParams,) {
    this.currentParamsSubject.next(FilterParams);
  }

  getCurrentState(): FilterParams | null {
    return this.currentParamsSubject.getValue();
  }
}
