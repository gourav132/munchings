import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';

// Menu Items
export const addMenuItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, 'menuItems'), item);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateMenuItem = async (id, item) => {
  try {
    const menuRef = doc(db, 'menuItems', id);
    await updateDoc(menuRef, item);
  } catch (error) {
    throw error;
  }
};

export const deleteMenuItem = async (id) => {
  try {
    const menuRef = doc(db, 'menuItems', id);
    await deleteDoc(menuRef);
  } catch (error) {
    throw error;
  }
};

export const subscribeToMenu = (callback) => {
  const q = query(collection(db, 'menuItems'), orderBy('category'));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(items);
  });
};

// Reservations
export const addReservation = async (reservation) => {
  try {
    const docRef = await addDoc(collection(db, 'reservations'), {
      ...reservation,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateReservationStatus = async (id, status) => {
  try {
    const reservationRef = doc(db, 'reservations', id);
    await updateDoc(reservationRef, { status });
  } catch (error) {
    throw error;
  }
};

export const subscribeToReservations = (callback) => {
  const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const reservations = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date.toDate()
    }));
    callback(reservations);
  });
};

// Orders
export const addOrder = async (order) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...order,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    const orderRef = doc(db, 'orders', id);
    await updateDoc(orderRef, { status });
  } catch (error) {
    throw error;
  }
};

export const subscribeToOrders = (callback) => {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    }));
    callback(orders);
  });
};
