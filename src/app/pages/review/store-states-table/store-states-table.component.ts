import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../components/pagination/pagination.component';

interface TableRow {
  sucursal: string;
  estado1: number | null;
  estado2: number | null;
  estado3: number | null;
  total: number;
}

@Component({
  selector: 'app-store-states-table',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './store-states-table.component.html',
  styleUrls: ['./store-states-table.component.scss']
})
export class StoreStatesTableComponent {
  searchTerm: string = '';
  sortColumn: keyof TableRow = 'sucursal';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  // Sample table data with 70 stores
  tableData: TableRow[] = Array.from({ length: 70 }, (_, i) => {
    const storeTypes = ['WALMART', 'SORIANA', 'CHEDRAUI', 'COSTCO', 'SAMS', 'BODEGA', 'AURRERA', 'MEGA', 'COMERCIAL', 'SMART'];
    const cities = ['CDMX', 'GDL', 'MTY', 'PUE', 'MER', 'TIJ', 'CUN', 'VER', 'TOL', 'QRO'];
    const storeType = storeTypes[Math.floor(i / 7)];
    const city = cities[i % 10];
    const storeNumber = Math.floor(i / 10) + 1;

    return {
      sucursal: `${storeType}-${city}${storeNumber}`,
      estado1: Math.random() > 0.2 ? Math.floor(Math.random() * 4) + 1 : null,
      estado2: Math.random() > 0.2 ? Math.floor(Math.random() * 4) + 1 : null,
      estado3: Math.random() > 0.2 ? Math.floor(Math.random() * 4) + 1 : null,
      total: Math.floor(Math.random() * 7) + 3
    };
  });

  get filteredData(): TableRow[] {
    return this.tableData
      .filter(row => 
        row.sucursal.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        const aValue = a[this.sortColumn];
        const bValue = b[this.sortColumn];

        if (aValue === null) return 1;
        if (bValue === null) return -1;
        
        if (aValue < bValue) return this.sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
  }

  get paginatedData(): TableRow[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalItems(): number {
    return this.filteredData.length;
  }

  sort(column: keyof TableRow) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(column: keyof TableRow): string {
    if (this.sortColumn !== column) return '↕️';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }
}
