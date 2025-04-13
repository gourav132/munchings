import React from 'react';
import { Calendar, ShoppingBag, Utensils } from 'lucide-react';
import { motion } from 'framer-motion';

const NavigationTabs = ({ activeTab, setActiveTab, pendingReservationsCount, newOrdersCount }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow mb-8"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <TabButton
            icon={<Calendar className="h-5 w-5 mr-2" />}
            label="Reservations"
            isActive={activeTab === "reservations"}
            onClick={() => setActiveTab("reservations")}
            count={pendingReservationsCount}
          />
          <TabButton
            icon={<ShoppingBag className="h-5 w-5 mr-2" />}
            label="Orders"
            isActive={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
            count={newOrdersCount}
          />
          <TabButton
            icon={<Utensils className="h-5 w-5 mr-2" />}
            label="Menu Management"
            isActive={activeTab === "menu"}
            onClick={() => setActiveTab("menu")}
          />
        </nav>
      </div>
    </motion.div>
  );
};

const TabButton = ({ icon, label, isActive, onClick, count }) => (
  <motion.button
    className={`py-4 px-6 font-medium text-sm border-b-2 ${
      isActive
        ? "border-amber-600 text-amber-600"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
    }`}
    onClick={onClick}
    whileHover={{ y: -2 }}
    whileTap={{ y: 0 }}
  >
    <div className="flex items-center">
      {icon}
      {label}
      {count > 0 && (
        <motion.span
          className="ml-2 px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-800"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {count}
        </motion.span>
      )}
    </div>
  </motion.button>
);

export default NavigationTabs;