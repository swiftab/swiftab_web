export interface AuthData {
  name?: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  user: {
    userId?: string;
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
}

export interface Authwaiter {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
}

export interface AuthWaiterResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
  statusCode?: number;
  details?: any;
}
