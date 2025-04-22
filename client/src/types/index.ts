export interface User {
  id: number;
  username: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}

export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  orderName: string;
  product: Product[];
}

export interface CustomerInputUpdate {
  firstName: string;
  lastName: string;
  age: number;
  orderName: string;
  product: Product[];
}

export interface AuthUser {
  id: number;
  username: string;
  accessToken: string;
  role: "USER" | "ADMIN";
} 