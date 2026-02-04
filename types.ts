
export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description?: string;
  createdAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedOptions?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Cashier';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  initials: string;
}

export interface Sale {
  id: string;
  date: string;
  customer: string;
  salesPersonName: string;
  items: number;
  total: number;
  status: 'Completed' | 'Refunded' | 'Pending';
  paymentMethod: 'Cash' | 'Credit Card' | 'Mobile Pay';
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  totalSpent: number;
  lastVisit: string;
  tier: 'VIP' | 'Regular' | 'New';
  initials: string;
}

export type View = 'Terminal' | 'Inventory' | 'Sales' | 'Reports' | 'Customers' | 'Employees';
