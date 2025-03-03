import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define types for reservations and orders
export interface Reservation {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  tableNumber: string;
  items: OrderItem[];
  specialInstructions?: string;
  subtotal: number;
  tax: number;
  total: number;
  status: 'new' | 'preparing' | 'served' | 'completed';
  createdAt: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  reservations: Reservation[];
  orders: Order[];
  updateReservationStatus: (id: number, status: 'pending' | 'confirmed' | 'cancelled') => void;
  updateOrderStatus: (id: number, status: 'new' | 'preparing' | 'served' | 'completed') => void;
  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => void;
  addOrder: (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

// Sample data
const sampleReservations: Reservation[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    date: '2025-06-15',
    time: '7:00 PM',
    guests: 4,
    status: 'confirmed',
    createdAt: '2025-06-10T14:30:00Z'
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily@example.com',
    phone: '(555) 987-6543',
    date: '2025-06-16',
    time: '6:30 PM',
    guests: 2,
    specialRequests: 'Window seat preferred',
    status: 'pending',
    createdAt: '2025-06-11T09:15:00Z'
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@example.com',
    phone: '(555) 456-7890',
    date: '2025-06-16',
    time: '8:00 PM',
    guests: 6,
    specialRequests: 'Celebrating a birthday',
    status: 'pending',
    createdAt: '2025-06-11T10:45:00Z'
  }
];

const sampleOrders: Order[] = [
  {
    id: 1,
    tableNumber: '12',
    items: [
      { id: 1, name: 'Prime Ribeye Steak', price: 32.99, quantity: 2 },
      { id: 4, name: 'Caprese Salad', price: 14.99, quantity: 1 }
    ],
    subtotal: 80.97,
    tax: 6.48,
    total: 87.45,
    status: 'preparing',
    createdAt: '2025-06-15T18:30:00Z'
  },
  {
    id: 2,
    tableNumber: '8',
    items: [
      { id: 2, name: 'Seafood Linguine', price: 28.99, quantity: 1 },
      { id: 6, name: 'Crispy Calamari', price: 16.99, quantity: 1 },
      { id: 8, name: 'Tiramisu', price: 11.99, quantity: 2 }
    ],
    specialInstructions: 'No garlic in the linguine please',
    subtotal: 69.96,
    tax: 5.60,
    total: 75.56,
    status: 'new',
    createdAt: '2025-06-15T19:15:00Z'
  }
];

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>(sampleReservations);
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  // In a real app, you would validate against a backend
  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'password') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const updateReservationStatus = (id: number, status: 'pending' | 'confirmed' | 'cancelled') => {
    setReservations(prevReservations => 
      prevReservations.map(reservation => 
        reservation.id === id ? { ...reservation, status } : reservation
      )
    );
  };

  const updateOrderStatus = (id: number, status: 'new' | 'preparing' | 'served' | 'completed') => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const addReservation = (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => {
    const newReservation: Reservation = {
      ...reservation,
      id: reservations.length > 0 ? Math.max(...reservations.map(r => r.id)) + 1 : 1,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    setReservations(prev => [...prev, newReservation]);
  };

  const addOrder = (order: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <AdminContext.Provider 
      value={{ 
        isAuthenticated, 
        login, 
        logout, 
        reservations, 
        orders, 
        updateReservationStatus, 
        updateOrderStatus,
        addReservation,
        addOrder
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};