import { Injectable } from '@angular/core';
import { ValesStates } from '../interfaces/vales-data.interfaces';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValesStateTableService {
  private mockData: Record<number, ValesStates[]> = {
    1: [ // Jalisco
      { estado: 'En Progreso', sucursalOrigen: '32', sucursalDestino: '32', count: 32 },
      { estado: 'Descargado', sucursalOrigen: '26', sucursalDestino: '26', count: 26 },
      { estado: 'Afectado', sucursalOrigen: '125', sucursalDestino: '125', count: 125 }
    ],
    2: [ // CDMX
      { estado: 'En Progreso', sucursalOrigen: '45', sucursalDestino: '45', count: 45 },
      { estado: 'Descargado', sucursalOrigen: '35', sucursalDestino: '35', count: 35 },
      { estado: 'Afectado', sucursalOrigen: '70', sucursalDestino: '70', count: 70 }
    ],
    5: [ // Monterrey
      { estado: 'En Progreso', sucursalOrigen: '70', sucursalDestino: '70', count: 70 },
      { estado: 'Descargado', sucursalOrigen: '90', sucursalDestino: '90', count: 90 },
      { estado: 'Afectado', sucursalOrigen: '50', sucursalDestino: '50', count: 50 }
    ]
  };

  constructor() { }

  getStateData(stateId: number): Observable<{ success: boolean; data: ValesStates[] }> {
    const response = this.mockData[stateId] ? { success: true, data: this.mockData[stateId]} : { success: false, data: []};
    return of(response).pipe(delay(800));
  }



}
