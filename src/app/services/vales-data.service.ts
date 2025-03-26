import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { ApiResponse, StateSummary, FilterParams, StateFilter } from '../interfaces/vales-data.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ValesDataService {
  // Mock data for different states
  private mockData: Record<number, StateSummary> = {
    1: { // Jalisco
      totalVales: 183,
      porEstado: {
        enProgreso: 32,
        descargados: 26,
        afectados: 125,
        total: 183
      }
    },
    2: { // Ciudad de México
      totalVales: 150,
      porEstado: {
        enProgreso: 45,
        descargados: 35,
        afectados: 70,
        total: 150
      }
    },
    5: { // Monterrey
      totalVales: 210,
      porEstado: {
        enProgreso: 70,
        descargados: 90,
        afectados: 50,
        total: 210
      }
    }
    // Add more mock data for other states as needed
  };

  constructor(private http: HttpClient) {}

  // Method to get data for a specific state
  getStateData(filterParams: FilterParams): Observable<ApiResponse<StateSummary>> {
    // Simulate API call with delay
    return of({
      success: true,
      data: this.mockData[filterParams.id] || {
        totalVales: 0,
        porEstado: { enProgreso: 0, descargados: 0, afectados: 0, total: 0 },
        porSucursal: []
      },
      timestamp: new Date().toISOString()
    }).pipe(
      delay(800) // Simulate network delay
    );
  }

  // Method to refresh data (will be used when we have real API)
  refreshData(filterParams: FilterParams): Observable<ApiResponse<StateSummary>> {
    // In real implementation, this would invalidate cache and make a new request
    return this.getStateData(filterParams);
  }

  // Add error simulation for testing
  private simulateError(filterParams: FilterParams): Observable<ApiResponse<StateSummary>> {
    return of({
      success: false,
      data: null as any,
      error: `Failed to fetch data for state ${filterParams.name}`,
      timestamp: new Date().toISOString()
    }).pipe(
      delay(800)
    );
  }
}