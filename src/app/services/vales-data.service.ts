import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { ApiResponse, StateSummary, StateFilter } from '../interfaces/vales-data.interfaces';

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
      },
      porSucursal: [
        {
          sucursal: "Sucursal A",
          estado1: 10,
          estado2: 8,
          estado3: 42,
          total: 60
        },
        {
          sucursal: "Sucursal B",
          estado1: 12,
          estado2: 10,
          estado3: 43,
          total: 65
        },
        {
          sucursal: "Sucursal C",
          estado1: 10,
          estado2: 8,
          estado3: 40,
          total: 58
        }
      ]
    },
    2: { // Ciudad de México
      totalVales: 150,
      porEstado: {
        enProgreso: 45,
        descargados: 35,
        afectados: 70,
        total: 150
      },
      porSucursal: [
        {
          sucursal: "Sucursal X",
          estado1: 15,
          estado2: 12,
          estado3: 23,
          total: 50
        },
        {
          sucursal: "Sucursal Y",
          estado1: 15,
          estado2: 11,
          estado3: 24,
          total: 50
        },
        {
          sucursal: "Sucursal Z",
          estado1: 15,
          estado2: 12,
          estado3: 23,
          total: 50
        }
      ]
    },
    5: { // Monterrey
      totalVales: 210,
      porEstado: {
        enProgreso: 70,
        descargados: 90,
        afectados: 50,
        total: 210
      },
      porSucursal: [
        {
          sucursal: "Monterrey Centro",
          estado1: 25,
          estado2: 30,
          estado3: 15,
          total: 70
        },
        {
          sucursal: "Monterrey Norte",
          estado1: 20,
          estado2: 35,
          estado3: 15,
          total: 70
        },
        {
          sucursal: "Monterrey Sur",
          estado1: 25,
          estado2: 25,
          estado3: 20,
          total: 70
        }
      ]
    }
    // Add more mock data for other states as needed
  };

  constructor(private http: HttpClient) {}

  // Method to get data for a specific state
  getStateData(filter: StateFilter): Observable<ApiResponse<StateSummary>> {
    // Simulate API call with delay
    return of({
      success: true,
      data: this.mockData[filter.id] || {
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
  refreshData(filter: StateFilter): Observable<ApiResponse<StateSummary>> {
    // In real implementation, this would invalidate cache and make a new request
    return this.getStateData(filter);
  }

  // Add error simulation for testing
  private simulateError(filter: StateFilter): Observable<ApiResponse<StateSummary>> {
    return of({
      success: false,
      data: null as any,
      error: `Failed to fetch data for state ${filter.name}`,
      timestamp: new Date().toISOString()
    }).pipe(
      delay(800)
    );
  }
}