import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAdmin } from '../context/AdminContext';
import { Calendar, ShoppingBag, LogOut, Clock, CheckCircle, XCircle, AlertCircle, ChefHat, Coffee, Edit, Trash, Plus, Utensils } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  subscribeToMenu,
  addMenuItem as addMenuItemFirestore,
  updateMenuItem as updateMenuItemFirestore,
  deleteMenuItem as deleteMenuItemFirestore
} from '../services/firestore';

import { getAuth, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('reservations');
  const { currentUser, logout: authLogout } = useAuth();
  const { reservations, orders, updateReservationStatus, updateOrderStatus } = useAdmin();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'mains',
    image: ''
  });

  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate('/admin/login');
      return;
    }

    // Subscribe to menu items
    const unsubscribe = subscribeToMenu((items) => {
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, [auth,currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem({...item});
  };

  const handleUpdateItem = async () => {
    try {
      await updateMenuItemFirestore(editingItem.id, editingItem);
      setEditingItem(null);
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteMenuItemFirestore(id);
    } catch (error) {
      console.error('Error deleting menu item:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await addMenuItemFirestore(newItem);
      setIsAddingItem(false);
      setNewItem({
        name: '',
        description: '',
        price: 0,
        category: 'mains',
        image: ''
      });
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
      case 'served':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'new':
      case 'preparing':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
      case 'completed':
      case 'served':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'pending':
      case 'new':
      case 'preparing':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 mr-1" />;
      default:
        return <AlertCircle className="h-4 w-4 mr-1" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingReservationsCount = reservations.filter(r => r.status === 'pending').length;
  const newOrdersCount = orders.filter(o => o.status === 'new').length;

  return (
    <motion.div 
      className="bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <motion.div 
              className="flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold text-amber-800">Savoria Admin Dashboard</h1>
            </motion.div>
            <motion.div 
              className="flex items-center"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-md bg-amber-600 text-white hover:bg-amber-700 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div 
            className="bg-white rounded-lg shadow p-6"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-800">
                <Calendar className="h-8 w-8" />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm font-medium uppercase">Pending Reservations</p>
                <div className="flex items-center">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900"
                    key={pendingReservationsCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {pendingReservationsCount}
                  </motion.h3>
                  {pendingReservationsCount > 0 && (
                    <motion.span 
                      className="ml-2 px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Needs Attention
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-lg shadow p-6"
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-amber-100 text-amber-800">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div className="ml-5">
                <p className="text-gray-500 text-sm font-medium uppercase">New Orders</p>
                <div className="flex items-center">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-900"
                    key={newOrdersCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {newOrdersCount}
                  </motion.h3>
                  {newOrdersCount > 0 && (
                    <motion.span 
                      className="ml-2 px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      Needs Attention
                    </motion.span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          className="bg-white rounded-lg shadow mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <motion.button
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'reservations'
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('reservations')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Reservations
                  {pendingReservationsCount > 0 && (
                    <motion.span 
                      className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {pendingReservationsCount}
                    </motion.span>
                  )}
                </div>
              </motion.button>
              <motion.button
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'orders'
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('orders')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <div className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Orders
                  {newOrdersCount > 0 && (
                    <motion.span 
                      className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {newOrdersCount}
                    </motion.span>
                  )}
                </div>
              </motion.button>
              <motion.button
                className={`py-4 px-6 font-medium text-sm border-b-2 ${
                  activeTab === 'menu'
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('menu')}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                <div className="flex items-center">
                  <Utensils className="h-5 w-5 mr-2" />
                  Menu Management
                </div>
              </motion.button>
            </nav>
          </div>
        </motion.div>

        {/* Reservations Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'reservations' && (
            <motion.div 
              className="bg-white rounded-lg shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              key="reservations"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Reservation Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Party Size
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {reservations.map((reservation) => (
                        <motion.tr 
                          key={reservation.id} 
                          className={reservation.status === 'pending' ? 'bg-amber-50' : ''}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          layout
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{reservation.name}</div>
                            <div className="text-sm text-gray-500">{reservation.email}</div>
                            <div className="text-sm text-gray-500">{reservation.phone}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{new Date(reservation.date).toLocaleDateString()}</div>
                            <div className="text-sm text-gray-500">{reservation.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {reservation.guests} {reservation.guests === 1 ? 'person' : 'people'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <motion.span 
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(reservation.status)}`}
                              whileHover={{ scale: 1.1 }}
                              layout
                            >
                              <div className="flex items-center">
                                {getStatusIcon(reservation.status)}
                                {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                              </div>
                            </motion.span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(reservation.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              {reservation.status === 'pending' && (
                                <>
                                  <motion.button
                                    onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                                    className="text-green-600 hover:text-green-900"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    Confirm
                                  </motion.button>
                                  <motion.button
                                    onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                                    className="text-red-600 hover:text-red-900"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    Cancel
                                  </motion.button>
                                </>
                              )}
                              {reservation.status === 'confirmed' && (
                                <motion.button
                                  onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                                  className="text-red-600 hover:text-red-900"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  Cancel
                                </motion.button>
                              )}
                              {reservation.status === 'cancelled' && (
                                <motion.button
                                  onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                                  className="text-green-600 hover:text-green-900"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  Restore
                                </motion.button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {reservations.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No reservations found</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Orders Tab Content */}
          {activeTab === 'orders' && (
            <motion.div 
              className="bg-white rounded-lg shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              key="orders"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Order Management</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {orders.map((order) => (
                        <motion.tr 
                          key={order.id} 
                          className={order.status === 'new' ? 'bg-amber-50' : ''}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          layout
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">Order #{order.id}</div>
                            <div className="text-sm text-gray-500">Table: {order.tableNumber}</div>
                            {order.specialInstructions && (
                              <div className="text-sm text-gray-500 italic mt-1">
                                Note: {order.specialInstructions}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <ul className="text-sm text-gray-500 list-disc pl-5">
                              {order.items.map((item, index) => (
                                <li key={index}>
                                  {item.quantity}x {item.name} (${item.price.toFixed(2)})
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">${order.total.toFixed(2)}</div>
                            <div className="text-xs text-gray-500">
                              Subtotal: ${order.subtotal.toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Tax: ${order.tax.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <motion.span 
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                              whileHover={{ scale: 1.1 }}
                              layout
                            >
                              <div className="flex items-center">
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </div>
                            </motion.span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(order.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex flex-col space-y-2">
                              {order.status === 'new' && (
                                <motion.button
                                  onClick={() => updateOrderStatus(order.id, 'preparing')}
                                  className="text-amber-600 hover:text-amber-900 flex items-center"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <ChefHat className="h-4 w-4 mr-1" />
                                  Start Preparing
                                </motion.button>
                              )}
                              {order.status === 'preparing' && (
                                <motion.button
                                  onClick={() => updateOrderStatus(order.id, 'served')}
                                  className="text-green-600 hover:text-green-900 flex items-center"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <Coffee className="h-4 w-4 mr-1" />
                                  Mark as Served
                                </motion.button>
                              )}
                              {order.status === 'served' && (
                                <motion.button
                                  onClick={() => updateOrderStatus(order.id, 'completed')}
                                  className="text-green-600 hover:text-green-900 flex items-center"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Complete Order
                                </motion.button>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {orders.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No orders found</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Menu Management Tab Content */}
          {activeTab === 'menu' && (
            <motion.div 
              className="bg-white rounded-lg shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              key="menu"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Menu Management</h2>
                <motion.button
                  onClick={() => setIsAddingItem(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add New Item
                </motion.button>
              </div>

              {/* Add New Item Form */}
              <AnimatePresence>
                {isAddingItem && (
                  <motion.div 
                    className="p-6 border-b border-gray-200 bg-amber-50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-medium text-amber-800 mb-4">Add New Menu Item</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                          type="text" 
                          value={newItem.name} 
                          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input 
                          type="number" 
                          value={newItem.price} 
                          onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                          value={newItem.category} 
                          onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="starters">Starters</option>
                          <option value="mains">Mains</option>
                          <option value="desserts">Desserts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input 
                          type="text" 
                          value={newItem.image} 
                          onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                          value={newItem.description} 
                          onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <motion.button
                        onClick={() => setIsAddingItem(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={handleAddItem}
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!newItem.name || !newItem.description || !newItem.image || newItem.price <= 0}
                      >
                        Add Item
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Edit Item Form */}
              <AnimatePresence>
                {editingItem && (
                  <motion.div 
                    className="p-6 border-b border-gray-200 bg-amber-50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-lg font-medium text-amber-800 mb-4">Edit Menu Item</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input 
                          type="text" 
                          value={editingItem.name} 
                          onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                        <input 
                          type="number" 
                          value={editingItem.price} 
                          onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select 
                          value={editingItem.category} 
                          onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="starters">Starters</option>
                          <option value="mains">Mains</option>
                          <option value="desserts">Desserts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input 
                          type="text" 
                          value={editingItem.image} 
                          onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                          value={editingItem.description} 
                          onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        ></textarea>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <motion.button
                        onClick={() => setEditingItem(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        onClick={handleUpdateItem}
                        className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Update Item
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {menuItems.map((item) => (
                        <motion.tr 
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          layout
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-md truncate">{item.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">${item.price.toFixed(2)}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800 capitalize">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-3">
                              <motion.button
                                onClick={() => handleEditItem(item)}
                                className="text-amber-600 hover:text-amber-900 flex items-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </motion.button>
                              <motion.button
                                onClick={() => handleDeleteItem(item.id)}
                                className="text-red-600 hover:text-red-900 flex items-center"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Trash className="h-4 w-4 mr-1" />
                                Delete
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                {menuItems.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No menu items found</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Admin;