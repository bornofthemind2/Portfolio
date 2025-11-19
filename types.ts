export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  image: string;
  inStock: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  joinDate: string;
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'shipped';
}

export interface SalesData {
  month: string;
  revenue: number;
  sales: number;
}

export type ViewState = 'home' | 'store' | 'admin' | 'checkout' | 'success' | 'podcast';