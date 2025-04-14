import React from "react";
import { motion } from "framer-motion";

const MenuForm = ({ item, setItem, onSubmit, onCancel, isAdding }) => {
  return (
    <motion.div
      className="p-6 border-b border-gray-200 bg-amber-50"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium text-amber-800 mb-4">
        {isAdding ? "Add New Menu Item" : "Edit Menu Item"}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => setItem({ ...item, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="number"
            value={item.price}
            onChange={(e) =>
              setItem({ ...item, price: parseFloat(e.target.value) })
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
            value={item.category}
            onChange={(e) => setItem({ ...item, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="Starters">Starters</option>
            <option value="Mains">Mains</option>
            <option value="Desserts">Desserts</option>
            <option value="Mocktail">Mocktail</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            value={item.image}
            onChange={(e) => setItem({ ...item, image: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={item.description}
            onChange={(e) => setItem({ ...item, description: e.target.value })}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500"
          ></textarea>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-3">
        <motion.button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Cancel
        </motion.button>
        <motion.button
          onClick={onSubmit}
          className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={
            !item.name || !item.description || !item.image || item.price <= 0
          }
        >
          {isAdding ? "Add Item" : "Update Item"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MenuForm;
