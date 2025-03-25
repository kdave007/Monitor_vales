import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

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
  showPicker = false;
  
  // For month picker
  months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  currentYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth();
  selectedYear = this.currentYear;

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
}
