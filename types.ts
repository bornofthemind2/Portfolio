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

export type ViewState = 'home' | 'store' | 'admin' | 'checkout' | 'success' | 'podcast' | 'meet-greet' | 'episode';

export interface Episode {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  date: string;
  hasPlayer: boolean;
  playerSrc?: string;
  externalUrl?: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
  booked?: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'meet-greet' | 'book-signing' | 'discussion';
  notes?: string;
  paymentStatus: 'pending' | 'paid' | 'confirmed';
  amount: number;
  createdAt: string;
}