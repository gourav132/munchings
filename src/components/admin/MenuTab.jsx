import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import MenuForm from "./MenuForm";
import MenuItems from "./MenuItems";

const MenuTab = ({
  menuItems,
  handleEditItem,
  handleDeleteItem,
  editingItem,
  setEditingItem,
  handleUpdateItem,
  isAddingItem,
  setIsAddingItem,
  newItem,
  setNewItem,
  handleAddItem,
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
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

      <AnimatePresence>
        {isAddingItem && (
          <MenuForm
            item={newItem}
            setItem={setNewItem}
            onSubmit={handleAddItem}
            onCancel={() => setIsAddingItem(false)}
            isAdding={true}
          />
        )}

        {editingItem && (
          <MenuForm
            item={editingItem}
            setItem={setEditingItem}
            onSubmit={handleUpdateItem}
            onCancel={() => setEditingItem(null)}
            isAdding={false}
          />
        )}
      </AnimatePresence>

      <MenuItems
        menuItems={menuItems}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
      />
    </motion.div>
  );
};

export default MenuTab;
