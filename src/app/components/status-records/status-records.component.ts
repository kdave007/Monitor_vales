import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-status-records',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './status-records.component.html',
  styleUrls: ['./status-records.component.scss']
})
export class RecordsStatusComponent {
  // Sample data - in a real app, this would come from a service
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
    }
  ];

  // Methods for handling actions
  viewRecord(folio: string): void {
    console.log(`Viewing record: ${folio}`);
    // Implement view logic
  }

  editRecord(folio: string): void {
    console.log(`Editing record: ${folio}`);
    // Implement edit logic
  }

  // Method for handling search
  searchRecords(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    console.log(`Searching for: ${searchTerm}`);
    // Implement search logic
  }
}
