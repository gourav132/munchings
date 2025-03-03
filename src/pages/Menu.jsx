import React, { useState } from "react";
import { menuData } from "../data/menuData";
import { useCart } from "../context/CartContext";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { addToCart } = useCart();

  const categories = ["all", ...new Set(menuData.map((item) => item.category))];

  const filteredItems =
    activeCategory === "all"
      ? menuData
      : menuData.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      duration: 2000,
      position: 'bottom-right',
      style: {
        background: '#fef3c7',
        color: '#92400e',
        border: '1px solid #d97706',
      },
    });
  };

  return (
    <div className="bg-amber-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Our Menu</h1>
          <div className="w-24 h-1 bg-amber-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore our carefully crafted menu featuring the finest ingredients
            and flavors. Add your favorite dishes to your cart for dine-in
            ordering.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full capitalize ${
                activeCategory === category
                  ? "bg-amber-600 text-white"
                  : "bg-white text-amber-800 hover:bg-amber-100"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                layout
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-amber-800">
                      {item.name}
                    </h3>
                    <span className="text-amber-600 font-bold text-lg">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm font-semibold mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold py-0.5 text-white capitalize bg-amber-400 px-2 rounded-full">
                      {item.category}
                    </span>
                    <motion.button
                      onClick={() => handleAddToCart(item)}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center transition text-xs font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Order
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <Toaster />
    </div>
  );
};

export default Menu;
