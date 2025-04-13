import React from 'react';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminHeader = ({ handleLogout }) => {
  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
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
  );
};

export default AdminHeader;