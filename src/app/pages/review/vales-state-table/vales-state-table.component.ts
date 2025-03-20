import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TableRow {
  estado: string;
  sucursalOrigen: string;
  sucursalDestino: string;
  count: number;
}

@Component({
  selector: 'app-vales-state-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vales-state-table.component.html',
  styleUrls: ['./vales-state-table.component.scss']
})
export class ValesStateTableComponent {
  // Sample data
  tableData: TableRow[] = [
    { estado: 'En Progreso', sucursalOrigen: '32', sucursalDestino: '32', count: 32 },
    { estado: 'Descargado', sucursalOrigen: '26', sucursalDestino: '26', count: 26 },
    { estado: 'Afectado', sucursalOrigen: '125', sucursalDestino: '125', count: 125 }
  ];

  // Calculate totals
  get totalRow(): TableRow {
    return {
      estado: 'Total general',
      sucursalOrigen: this.tableData.reduce((sum, row) => sum + Number(row.sucursalOrigen), 0).toString(),
      sucursalDestino: this.tableData.reduce((sum, row) => sum + Number(row.sucursalDestino), 0).toString(),
      count: this.tableData.reduce((sum, row) => sum + row.count, 0)
    };
  }
}
