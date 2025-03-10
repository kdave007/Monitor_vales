import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginationComponent } from '../pagination/pagination.component';
import { StatusDetailComponent } from './status-detail/status-detail.component'

// Define the record type
interface Record {
  folio: string;
  claveSucursal: string;
  status: string;
  detalle: string;
  fecha: string;
}

// Define the sort direction type
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-status-records',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    PaginationComponent,
    StatusDetailComponent
  ],
  templateUrl: './status-records.component.html',
  styleUrls: ['./status-records.component.scss']
})
export class RecordsStatusComponent {

  // All records
  records: Record[] = [
    {
      folio: '001',
      claveSucursal: 'MEX-001',
      status: 'Pendiente',
      detalle: 'Solicitud de apoyo',
      fecha: '2022-01-01'
    },
    {
      folio: '002',
      claveSucursal: 'MEX-002',
      status: 'En proceso',
      detalle: 'Apoyo en curso',
      fecha: '2022-01-05'
    },
    {
      folio: '003',
      claveSucursal: 'MEX-003',
      status: 'Finalizado',
      detalle: 'Apoyo finalizado',
      fecha: '2022-01-10'
    },
    {
      folio: '004',
      claveSucursal: 'MEX-004',
      status: 'Pendiente',
      detalle: 'Nueva solicitud',
      fecha: '2022-01-15'
    },
    {
      folio: '005',
      claveSucursal: 'MEX-005',
      status: 'En proceso',
      detalle: 'Revisión en curso',
      fecha: '2022-01-20'
    },
    {
      folio: '006',
      claveSucursal: 'MEX-006',
      status: 'Finalizado',
      detalle: 'Solicitud aprobada',
      fecha: '2022-01-25'
    },
    {
      folio: '007',
      claveSucursal: 'MEX-007',
      status: 'Pendiente',
      detalle: 'Esperando documentación',
      fecha: '2022-01-30'
    },
    {
      folio: '008',
      claveSucursal: 'MEX-008',
      status: 'En proceso',
      detalle: 'En revisión técnica',
      fecha: '2022-02-01'
    },
    {
      folio: '009',
      claveSucursal: 'MEX-009',
      status: 'Finalizado',
      detalle: 'Proceso completado',
      fecha: '2022-02-05'
    },
    {
      folio: '010',
      claveSucursal: 'MEX-010',
      status: 'Pendiente',
      detalle: 'Solicitud de recursos',
      fecha: '2022-02-10'
    },
    {
      folio: '011',
      claveSucursal: 'MEX-011',
      status: 'En proceso',
      detalle: 'Asignación de personal',
      fecha: '2022-02-15'
    },
    {
      folio: '012',
      claveSucursal: 'MEX-012',
      status: 'Finalizado',
      detalle: 'Proyecto entregado',
      fecha: '2022-02-20'
    },
    {
      folio: '013',
      claveSucursal: 'MEX-013',
      status: 'Pendiente',
      detalle: 'Esperando aprobación',
      fecha: '2022-02-25'
    },
    {
      folio: '014',
      claveSucursal: 'MEX-014',
      status: 'En proceso',
      detalle: 'Reunión de seguimiento',
      fecha: '2022-03-01'
    },
    {
      folio: '015',
      claveSucursal: 'MEX-015',
      status: 'Finalizado',
      detalle: 'Cierre del proyecto',
      fecha: '2022-03-05'
    },
    {
      folio: '016',
      claveSucursal: 'MEX-016',
      status: 'Pendiente',
      detalle: 'Solicitud de materiales',
      fecha: '2022-03-10'
    },
    {
      folio: '017',
      claveSucursal: 'MEX-017',
      status: 'En proceso',
      detalle: 'Compra de insumos',
      fecha: '2022-03-15'
    },
    {
      folio: '018',
      claveSucursal: 'MEX-018',
      status: 'Finalizado',
      detalle: 'Entrega de materiales',
      fecha: '2022-03-20'
    },
    {
      folio: '019',
      claveSucursal: 'MEX-019',
      status: 'Pendiente',
      detalle: 'Esperando firma',
      fecha: '2022-03-25'
    },
    {
      folio: '020',
      claveSucursal: 'MEX-020',
      status: 'En proceso',
      detalle: 'Revisión final',
      fecha: '2022-03-30'
    }
  ];

  // Pagination properties
  filteredRecords: Record[] = [];
  paginatedRecords: Record[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  searchTerm = '';

  // Sorting properties
  sortColumn: keyof Record = 'folio';
  sortDirection: SortDirection = 'asc';

  showDetailsWindow = false;
  selectedRecord: any;


  constructor() {
    this.filteredRecords = [...this.records];
    this.sortRecords('folio'); // Initial sort
    this.updatePaginatedRecords();
  }

  // Handle page change from pagination component
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedRecords();
  }

  // Filter records based on search term
  searchRecords(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredRecords = this.records.filter(record => 
      record.folio.toLowerCase().includes(this.searchTerm) ||
      record.claveSucursal.toLowerCase().includes(this.searchTerm) ||
      record.status.toLowerCase().includes(this.searchTerm) ||
      record.detalle.toLowerCase().includes(this.searchTerm)
    );
    this.currentPage = 1; // Reset to first page after search
    this.applySort(); // Apply current sort to filtered records
    this.updatePaginatedRecords();
  }

  // Sort records by column
  sortRecords(column: keyof Record): void {
    // If clicking the same column, toggle direction
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // If clicking a new column, set it as the sort column with ascending direction
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.applySort();
    this.updatePaginatedRecords();
  }

  // Apply current sort settings to filtered records
  private applySort(): void {
    this.filteredRecords.sort((a, b) => {
      const valueA = a[this.sortColumn].toLowerCase();
      const valueB = b[this.sortColumn].toLowerCase();
      
      // Special handling for date columns
      if (this.sortColumn === 'fecha') {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return this.sortDirection === 'asc' 
          ? dateA.getTime() - dateB.getTime() 
          : dateB.getTime() - dateA.getTime();
      }
      
      // For numeric folio values, convert to numbers for proper sorting
      if (this.sortColumn === 'folio') {
        const numA = parseInt(valueA, 10);
        const numB = parseInt(valueB, 10);
        if (!isNaN(numA) && !isNaN(numB)) {
          return this.sortDirection === 'asc' ? numA - numB : numB - numA;
        }
      }
      
      // Default string comparison
      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Update the records to display based on current page
  private updatePaginatedRecords(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRecords = this.filteredRecords.slice(
      startIndex, 
      startIndex + this.itemsPerPage
    );
  }

  // View record details
  viewRecord(record : any): void {
    console.log("Viewing record: ",record);
    this.showDetailsWindow = true;
    this.selectedRecord = record;
  }

  closeDetailsWindow() {
    this.showDetailsWindow = false;
    this.selectedRecord = null;
  }
  
}
