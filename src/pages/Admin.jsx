import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import { formatDate, getStatusColor, getStatusIcon } from "../utils/formatters";
import {
  LogOut,
  Calendar,
  ShoppingBag,
  Utensils,
  Plus,
  Home,
  ChevronRight,
  Bell,
  Settings,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToMenu } from "../services/firestore";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../config/firebase";

import AdminHeader from "../components/admin/AdminHeader";
import StatsOverview from "../components/admin/StatsOverview";
import NavigationTabs from "../components/admin/NavigationTabs";
import ReservationsTab from "../components/admin/ReservationsTab";
import OrdersTab from "../components/admin/OrdersTab";
import MenuTab from "../components/admin/MenuTab";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("reservations");
  const { currentUser } = useAuth();
  const { reservations, orders, updateReservationStatus, updateOrderStatus } =
    useAdmin();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    category: "mains",
    image: "",
  });

  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/admin/login");
      return;
    }

    // Subscribe to menu items
    const unsubscribe = subscribeToMenu((items) => {
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, [auth, currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/admin/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleEditItem = (item) => {
    setEditingItem({ ...item });
  };

  const handleUpdateItem = async () => {
    try {
      await updateMenuItemFirestore(editingItem.id, editingItem);
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteMenuItemFirestore(id);
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleAddItem = async () => {
    try {
      await addMenuItemFirestore(newItem);
      setIsAddingItem(false);
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "mains",
        image: "",
      });
    } catch (error) {
      console.error("Error adding menu item:", error);
    }
  };

  const pendingReservationsCount = reservations.filter(
    (r) => r.status === "pending"
  ).length;
  const newOrdersCount = orders.filter((o) => o.status === "new").length;

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
          <div className="flex flex-col">
            {/* Breadcrumb */}
            <nav className="flex items-center py-3 text-gray-500 text-sm">
              <motion.div
                className="flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Home className="h-4 w-4" />
                <ChevronRight className="h-4 w-4 mx-2" />
                <span>Dashboard</span>
              </motion.div>
            </nav>

            {/* Header */}
            <div className="flex justify-between items-center py-4">
              <motion.div
                className="flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-amber-800">
                  Savoria Admin Dashboard
                </h1>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Notifications */}
                <motion.button
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </motion.button>

                {/* Settings */}
                <motion.button
                  className="p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                </motion.button>

                {/* User Profile */}
                <div className="flex items-center space-x-3 border-l pl-4">
                  <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-700">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500">
                      admin@restaurant.com
                    </p>
                  </div>
                  <motion.button
                    onClick={handleLogout}
                    className="ml-2 px-3 py-1 rounded-md bg-amber-600 text-white hover:bg-amber-700 flex items-center text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <StatsOverview />
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
                  activeTab === "reservations"
                    ? "border-amber-600 text-amber-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("reservations")}
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
                  activeTab === "orders"
                    ? "border-amber-600 text-amber-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("orders")}
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
                  activeTab === "menu"
                    ? "border-amber-600 text-amber-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab("menu")}
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
          {activeTab === "reservations" && (
            <ReservationsTab
              reservations={reservations}
              updateReservationStatus={updateReservationStatus}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          )}

          {/* Orders Tab Content */}
          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              updateOrderStatus={updateOrderStatus}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          )}

          {/* Menu Management Tab Content */}
          {activeTab === "menu" && (
            <motion.div
              className="bg-white rounded-lg shadow overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              key="menu"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">
                  Menu Management
                </h2>
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
                    <h3 className="text-lg font-medium text-amber-800 mb-4">
                      Add New Menu Item
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={newItem.name}
                          onChange={(e) =>
                            setNewItem({ ...newItem, name: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          value={newItem.price}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              price: parseFloat(e.target.value),
                            })
                          }
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={newItem.category}
                          onChange={(e) =>
                            setNewItem({ ...newItem, category: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="starters">Starters</option>
                          <option value="mains">Mains</option>
                          <option value="desserts">Desserts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={newItem.image}
                          onChange={(e) =>
                            setNewItem({ ...newItem, image: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={newItem.description}
                          onChange={(e) =>
                            setNewItem({
                              ...newItem,
                              description: e.target.value,
                            })
                          }
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
                        disabled={
                          !newItem.name ||
                          !newItem.description ||
                          !newItem.image ||
                          newItem.price <= 0
                        }
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
                    <h3 className="text-lg font-medium text-amber-800 mb-4">
                      Edit Menu Item
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          value={editingItem.price}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              price: parseFloat(e.target.value),
                            })
                          }
                          step="0.01"
                          min="0"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <select
                          value={editingItem.category}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        >
                          <option value="starters">Starters</option>
                          <option value="mains">Mains</option>
                          <option value="desserts">Desserts</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="text"
                          value={editingItem.image}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              image: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <textarea
                          value={editingItem.description}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              description: e.target.value,
                            })
                          }
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
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
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
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {item.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-md truncate">
                              {item.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${item.price.toFixed(2)}
                            </div>
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
