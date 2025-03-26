// Basic Vale record
export interface ValesStates {
    estado: 'En Progreso' | 'Descargado' | 'Afectado';
    sucursalOrigen: string;
    sucursalDestino: string;
    count : number
}

// Pie Chart Statistics
export interface ChartStatistics {
    enProgreso: number;
    descargados: number;
    afectados: number;
    total: number;
}

// Table Statistics per Store
export interface StoreStatistics {
    sucursal: string;
    estado1: number;  // En Progreso
    estado2: number;  // Descargado
    estado3: number;  // Afectado
    total: number;
}

// Summary Statistics
export interface StateSummary {
    totalVales: number;
    porEstado: ChartStatistics;
}

// API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    data: T;
    error?: string;
    timestamp: string;
}

// State filter type
export interface StateFilter {
    id: number;
    name: string;
    date?: string;
    date_type?: string;
}