import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { StateSummary } from '../../../interfaces/vales-data.interfaces';
import { StateManagerService } from '../../../services/state-manager.service';
import { ValesDataService } from '../../../services/vales-data.service';

// Register Spanish locale
registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-fetch-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './fetch-filter.component.html',
  styles: [''],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }]
})
export class FetchFilterComponent {

  selectedView: 'day' | 'month' = 'day';
  selectedDate: Date = new Date();

  states = [
    { id: 1, name: 'Jalisco' },
    { id: 2, name: 'Ciudad de México' },
    { id: 5, name: 'Monterrey' }
  ];
  selectedStateId = this.states[0].id;
  stateData: StateSummary | null = null;

  selectedState = this.states[0];


  showPicker = false;
  
  // For month picker
  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  currentYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth();
  selectedYear = this.currentYear;

  constructor(
    private stateManager: StateManagerService,
    private valesData: ValesDataService
  ){}

  onStateChange(event: any) {
    console.log(event.target.value)
    const found = this.states.find(state => state.id === +event.target.value);
    
    if (found) {
      console.log("TEST",this.selectedState)
      this.selectedState = found;
      
    }
  }

  onViewChange(view: 'day' | 'month') {
    this.selectedView = view;
    this.showPicker = false;
  }

  togglePicker() {
    this.showPicker = !this.showPicker;
  }

  // Month picker methods
  selectMonth(monthIndex: number) {
    this.selectedMonth = monthIndex;
    this.selectedDate = new Date(this.selectedYear, monthIndex, 1);
    this.showPicker = false;
  }

  changeYear(delta: number) {
    this.selectedYear += delta;
  }

  // Day picker methods
  getDaysInMonth(year: number, month: number): number[] {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  selectDay(day: number) {
    this.selectedDate = new Date(this.selectedYear, this.selectedMonth, day);
    this.showPicker = false;
  }

  isToday(day: number): boolean {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === this.selectedMonth &&
           today.getFullYear() === this.selectedYear;
  }

  update() {
    //send both variables to the service
    this.stateManager.updateState(this.selectedState);
    // this.valesData.getStateData(this.selectedState).subscribe(response => {
    //   if (response.success) {
    //     this.stateData = response.data;
    //   }
    // });
    console.log(this.selectedDate)
    console.log(this.selectedView)
  }
}
