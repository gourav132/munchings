import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  subscribeToReservations,
  subscribeToOrders,
  updateReservationStatus as updateReservationStatusFirestore,
  updateOrderStatus as updateOrderStatusFirestore,
  addReservation as addReservationFirestore,
  addOrder as addOrderFirestore,
} from "../services/firestore";

export const AdminContext = createContext(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const auth = useAuth();
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let unsubscribeReservations;
    let unsubscribeOrders;

    if (auth?.currentUser) {
      // Subscribe to reservations
      unsubscribeReservations = subscribeToReservations(
        (updatedReservations) => {
          setReservations(updatedReservations);
        }
      );

      // Subscribe to orders
      unsubscribeOrders = subscribeToOrders((updatedOrders) => {
        console.log("Orders received in AdminContext:", updatedOrders);
        setOrders(updatedOrders || []);
      });
    } else {
      // Reset state when user is not authenticated
      setReservations([]);
      setOrders([]);
    }

    return () => {
      if (unsubscribeReservations) unsubscribeReservations();
      if (unsubscribeOrders) unsubscribeOrders();
    };
  }, [auth?.currentUser]);

  const updateReservationStatus = async (id, status) => {
    try {
      await updateReservationStatusFirestore(id, status);
    } catch (error) {
      console.error("Error updating reservation status:", error);
      throw error;
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await updateOrderStatusFirestore(id, status);
    } catch (error) {
      console.error("Error updating order status:", error);
      throw error;
    }
  };

  const addReservation = async (reservation) => {
    try {
      await addReservationFirestore(reservation);
    } catch (error) {
      console.error("Error adding reservation:", error);
      throw error;
    }
  };

  const addOrder = async (order) => {
    try {
      await addOrderFirestore(order);
    } catch (error) {
      console.error("Error adding order:", error);
      throw error;
    }
  };

  const value = {
    isAuthenticated: !!auth?.currentUser,
    reservations,
    orders,
    updateReservationStatus,
    updateOrderStatus,
    addReservation,
    addOrder,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
