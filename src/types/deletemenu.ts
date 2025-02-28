export interface MenuItem {
  id: string;
  code: string;
  menu: string;
  image: string;
  description: string;
  price: string;
  category: "breakfast" | "lunch" | "dinner";
}
export interface DeleteResponse {
  message: string;
  status: number;
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
  details?: any;
}
