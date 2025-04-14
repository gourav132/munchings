import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAdmin } from "../context/AdminContext";
import { formatDate, getStatusColor, getStatusIcon } from "../utils/formatters";
import { LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  subscribeToMenu,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../services/firestore";
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
      await updateMenuItem(editingItem.id, editingItem);
      setEditingItem(null);
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteMenuItem(id);
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  const handleAddItem = async () => {
    console.log(newItem);
    try {
      await addMenuItem(newItem);
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
            {/* Header */}
            <div className="flex justify-between items-center py-4">
              <motion.div
                className="flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-2xl font-bold text-amber-800">
                  Admin Dashboard
                </h1>
              </motion.div>

              <motion.div
                className="flex items-center space-x-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* ------------------------------------------------ Notifications -------------------------------------------------------------*/}
                {/* <motion.button
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </motion.button> */}
                {/* ------------------------------------------------ Notifications -------------------------------------------------------------*/}

                {/* ------------------------------------------------- Settings -----------------------------------------------------------------*/}
                {/* <motion.button
                  className="p-2 rounded-full hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                </motion.button> */}
                {/* ------------------------------------------------- Settings -----------------------------------------------------------------*/}

                {/* User Profile */}
                <div className="flex items-center space-x-3 border-l pl-4">
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
        {/* <StatsOverview
          pendingReservations={pendingReservationsCount}
          newOrders={newOrdersCount}
        /> */}
        {/* Navigation Tabs */}
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "reservations" && (
            <ReservationsTab
              reservations={reservations}
              updateReservationStatus={updateReservationStatus}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          )}
          {activeTab === "orders" && (
            <OrdersTab
              orders={orders}
              updateOrderStatus={updateOrderStatus}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
            />
          )}
          {activeTab === "menu" && (
            <MenuTab
              menuItems={menuItems}
              handleEditItem={handleEditItem}
              handleDeleteItem={handleDeleteItem}
              editingItem={editingItem}
              setEditingItem={setEditingItem}
              handleUpdateItem={handleUpdateItem}
              isAddingItem={isAddingItem}
              setIsAddingItem={setIsAddingItem}
              newItem={newItem}
              setNewItem={setNewItem}
              handleAddItem={handleAddItem}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Admin;
