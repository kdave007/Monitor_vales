import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-status-records',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    PaginationComponent
  ],
  templateUrl: './status-records.component.html',
  styleUrls: ['./status-records.component.scss']
})
export class RecordsStatusComponent {
  // All records
  records = [
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
  filteredRecords = [...this.records];
  paginatedRecords: any[] = [];
  currentPage = 1;
  itemsPerPage = 8;
  searchTerm = '';

  constructor() {
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
    this.updatePaginatedRecords();
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
  viewRecord(folio: string): void {
    console.log(`Viewing record: ${folio}`);
    // Implement view logic
  }

  // Edit record
  editRecord(folio: string): void {
    console.log(`Editing record: ${folio}`);
    // Implement edit logic
  }
}
