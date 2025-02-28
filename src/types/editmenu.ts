export interface MenuItem {
  id: string;
  code: string;
  menu: string;
  image: string;
  description: string;
  price: number;
  category: "breakfast" | "lunch" | "dinner";
}
export interface EditResponse {
  message: string;
  updatedItem: MenuItem;
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
  details?: any;
}
