export interface SaveLayoutData {
  diningAreas: string[];
  tableCapacity?: number;
  totalTables?: number;
}

export interface LayoutResponse {
  diningAreas: [string];
  totalTables: number;
  totalCapacity: number;
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
  details?: any;
}
