import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ValesDataService } from '../../../services/vales-data.service';
import { ApiResponse, StateSummary } from '../../../interfaces/vales-data.interfaces';
import { firstValueFrom } from 'rxjs';

export interface ReviewData {
  initialState: ApiResponse<StateSummary>;
}

export const reviewResolver: ResolveFn<ReviewData> = async (route, state) => {
  const valesService = inject(ValesDataService);
  
  // Get initial state data (Jalisco)
  const initialState = await firstValueFrom(valesService.getStateData({ 
    id: 1, 
    name: 'Jalisco' ,
    date: new Date().toISOString().split('T')[0],
    date_type: 'd'
  }));

  return {
    initialState
  };
};
