import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface State {
  id: number;
  name: string;
}



@Injectable({
  providedIn: 'root'
})
export class StateManagerService {
  // BehaviorSubject to hold the current state
  private currentStateSubject = new BehaviorSubject<State | null>(null);
  
  // Observable that components can subscribe to
  currentState$ = this.currentStateSubject.asObservable();

  // Method to update the state
  updateState(state: State,) {
    this.currentStateSubject.next(state);
  }

  // Method to get current state value
  getCurrentState(): State | null {
    return this.currentStateSubject.getValue();
  }
}