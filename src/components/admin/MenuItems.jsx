import React from "react";
import { motion } from "framer-motion";
import { Edit, Trash } from "lucide-react";

const MenuItems = ({ menuItems, onEdit, onDelete }) => {
  return (
    <div className="divide-y divide-gray-200">
      {menuItems.map((item) => (
        <motion.div
          key={item.id}
          className="p-6 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
              <div className="flex items-center mt-1">
                <span className="text-amber-600 font-medium">
                  ${item.price.toFixed(2)}
                </span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-500 capitalize">
                  {item.category}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <motion.button
              onClick={() => onEdit(item)}
              className="p-2 text-amber-600 hover:bg-amber-50 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit className="h-5 w-5" />
            </motion.button>
            <motion.button
              onClick={() => onDelete(item.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Trash className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MenuItems;
