export interface MenuData {
  name: string;
  description: string;
  cost: number;
  rate: number;
  image: string;
}
export interface MenuResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
  details?: any;
}
